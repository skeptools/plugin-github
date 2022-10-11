import * as github from '@cdktf/provider-github';
import { BaseProps, BaseTeam, overRecord, TeamBaseProps } from '@skeptools/skep-core';
import { Construct } from 'constructs';
import { Organization } from './organization';
import { Person, PersonProps } from './person';

export interface TeamProps extends BaseProps {
}

export class Team<
  TeamTypeType extends string,
  PersonKeyType extends string,
  RoleType
> extends BaseTeam<
  PersonKeyType,
  RoleType,
  PersonProps,
  Person<RoleType, TeamTypeType>,
  TeamTypeType,
  TeamProps
  > {
  constructor(
    scope: Construct,
    namespace: string,
    org: Organization<TeamTypeType>,
    people: Record<PersonKeyType, Person<RoleType, TeamTypeType>>,
    config: TeamProps & TeamBaseProps<PersonKeyType, TeamTypeType>,
  ) {
    super(scope, namespace, people, config);

    const team = new github.team.Team(this, `${namespace}-team`, {
      name: this.name,
      parentTeamId: org.rootTeamIds[this.type],
      description: this._props.homepage,
      privacy: 'closed',
    });

    overRecord(this._allPeople, (person, key) => {
      if (person.username) {
        new github.teamMembership.TeamMembership(this, `${namespace}-team-${person.slug}`, {
          teamId: team.id,
          username: person.username,
          role: config.leads.indexOf(key) >= 0 ? 'maintainer' : 'member',
        });
      }
    });

  }
}
