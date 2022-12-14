import * as github from '@cdktf/provider-github';
import { Factory as FactoryInterface, ProviderParameters } from '@skeptools/skep-core';
import { Organization, OrganizationProps } from './organization';
import { Person, PersonProps } from './person';
import { Team, TeamProps } from './team';

export * from './organization';
export * from './person';
export * from './team';
export interface ProviderParametersType {
  readonly token: string;
  readonly owner: string;
}

export class Factory<
  PersonKeyType extends string,
  TeamTypeType extends string,
  RoleType
> extends FactoryInterface<
  PersonKeyType,
  TeamTypeType,
  RoleType,
  OrganizationProps<TeamTypeType>,
  Organization<TeamTypeType>,
  PersonProps,
  Person<RoleType, TeamTypeType>,
  TeamProps,
  Team<TeamTypeType, PersonKeyType, RoleType>,
  ProviderParametersType
  > {
  organizationConstructor = Organization;
  personConstructor = Person;
  teamConstructor = Team;
  providerParameters: ProviderParameters<keyof ProviderParametersType> = {
    token: {
      type: 'string',
    },
    owner: {
      type: 'string',
    },
  };
  providerConstructor = github.provider.GithubProvider;
}
