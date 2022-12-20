import * as github from '@cdktf/provider-github';
import { BaseOrganization, BaseProps, OrganizationBaseProps, toKebabSlug, toTitleCase } from '@skeptools/skep-core';
import { Token } from 'cdktf';
import { Construct } from 'constructs';

export interface OrganizationProps<TeamTypeType extends string> extends BaseProps {
  readonly rootTeams: TeamTypeType[];
}

export class Organization<TeamTypeType extends string> extends BaseOrganization<OrganizationProps<TeamTypeType>> {
  _rootTeamIds: { [key in TeamTypeType]: number };

  constructor(
    scope: Construct,
    namespace: string,
    config: OrganizationProps<TeamTypeType> & OrganizationBaseProps,
  ) {
    super(scope, namespace, config);

    this._rootTeamIds = config.rootTeams.reduce((allTeamIds, current) => {
      const team = new github.team.Team(this, `${namespace}-org-team-${toKebabSlug(current)}`, {
        name: `All ${toTitleCase(current)}s`,
        description: `Parent group for all ${toTitleCase(current)}s`,
        privacy: 'closed',
      });
      allTeamIds[current] = Token.asNumber(team.id);
      return allTeamIds;
    }, Object.assign({}));
  }

  get rootTeamIds(): { [key in TeamTypeType]: number } {
    return this._rootTeamIds;
  }
}
