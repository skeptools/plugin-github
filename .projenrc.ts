import { typescript } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@skeptools/plugin-github',
  projenrcTs: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  deps: [
    '@cdktf/provider-github@~3',
    '@skeptools/skep-core@~0',
    'cdktf@~0',
    'constructs@~10',
  ],
  peerDeps: [
    '@cdktf/provider-github@~3',
    '@skeptools/skep-core@~0',
    'cdktf@~0',
    'constructs@~10',
  ],
  gitignore: [
    '*.d.ts',
    '*.js',
    'cdktf.out',
    'terraform.tfstate*',
    '.gen',
  ],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();