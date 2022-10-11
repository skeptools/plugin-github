import { OrganizationProps, PersonProps, SkepStack, TeamProps } from '@skeptools/skep-core';
import { App } from 'cdktf';
import { Factory } from '../src';

type TeamType = 'team' | 'guild';
type RoleType = 'engineering' | 'product';

const fooBar = {
  firstName: 'Foo',
  lastName: 'Bar',
  emailAddress: 'foo.bar@example.com',
  role: 'engineering',
  integrations: {
    github: {
      admin: true,
      username: 'foo.bar',
    },
  },
} as PersonProps<Integrations, RoleType>;

const balBaz = {
  firstName: 'Bal',
  lastName: 'Baz',
  emailAddress: 'bal.baz@example.com',
  role: 'product',
  integrations: {
    github: {
      username: 'bal.baz',
    },
  },
} as PersonProps<Integrations, RoleType>;

const people = { fooBar, balBaz };

const fooTeam = {
  name: 'Foo',
  leads: ['fooBar'],
  members: ['balBaz'],
  integrations: {
    github: {},
  },
} as TeamProps<Integrations, PeopleKeys, TeamType>;

const barGuild = {
  name: 'Bar',
  leads: ['fooBar'],
  members: ['balBaz'],
  integrations: {
    github: {},
  },
  type: 'guild',
} as TeamProps<Integrations, PeopleKeys, TeamType>;

const teams = { fooTeam, barGuild };

const organization: OrganizationProps<Integrations> = {
  name: 'Test',
  integrations: {
    github: {
      rootTeamIds: {
        guild: 1234,
        team: 5678,
      },
    },
  },
};

type PeopleKeys = Extract<keyof typeof people, string>;
type TeamKeys = Extract<keyof typeof teams, string>;
interface Integrations {
  github: Factory<PeopleKeys, TeamType, RoleType>;
}

export class TestSkepStack extends SkepStack<Integrations, PeopleKeys, TeamKeys, TeamType, RoleType> {
  get defaultConfig() {
    return {
      team: {
        type: 'team' as TeamType,
      },
    };
  }

  load(
    orgConfig: OrganizationProps<Integrations>,
    peopleConfig: Record<PeopleKeys, PersonProps<Integrations, RoleType>>,
    teamConfig: Record<TeamKeys, TeamProps<Integrations, PeopleKeys, TeamType>>,
  ): Integrations {
    const github = new Factory<PeopleKeys, TeamType, RoleType>(
      this,
      'github',
      this.getOrganizationConfig(orgConfig, 'github'),
      this.getPersonConfig(peopleConfig, 'github'),
      this.getTeamConfig(teamConfig, 'github'),
    );
    github.load();
    return { github };
  }
}

test('SkepStack', () => {
  const app = new App();
  new TestSkepStack(app, 'test-skep-stack', organization, people, teams);
  app.synth();
});