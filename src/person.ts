import * as github from '@cdktf/provider-github';
import { BasePerson, BaseProps, PersonBaseProps } from '@skeptools/skep-core';
import { Construct } from 'constructs';
import { Organization } from './organization';

export interface PersonProps extends BaseProps {
  readonly admin?: boolean;
  readonly username: string;
}

export class Person<
  RoleType,
  TeamTypeType extends string
> extends BasePerson<PersonProps, RoleType> {
  constructor(
    scope: Construct,
    namespace: string,
    _: Organization<TeamTypeType>,
    config: PersonProps & PersonBaseProps<RoleType>,
  ) {
    super(scope, namespace, config);

    new github.membership.Membership(this, `${namespace}-membership`, {
      username: this._props.username,
      role: this._props.admin ? 'admin' : 'member',
    });
  }

  get username(): string {
    return this._props.username;
  }
}
