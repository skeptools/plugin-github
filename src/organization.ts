import { BaseOrganization, BaseProps, OrganizationBaseProps } from '@skeptools/skep-core';
import { Construct } from 'constructs';

export interface OrganizationProps<TeamTypeType extends string> extends BaseProps {
  readonly rootTeamIds: { [key in TeamTypeType]: number };
}

export class Organization<TeamTypeType extends string> extends BaseOrganization<OrganizationProps<TeamTypeType>> {
  constructor(
    scope: Construct,
    namespace: string,
    config: OrganizationProps<TeamTypeType> & OrganizationBaseProps,
  ) {
    super(scope, namespace, config);
  }

  get rootTeamIds(): { [key in TeamTypeType]: number } {
    return this._props.rootTeamIds;
  }
}
