# Skep: GitHub plugin
A GitHub implementation for [Skep](https://github.com/skeptools/skep-core).

## Features

### Person
This plugin will add each person with a GitHub username to the GitHub org provided in the `organization` Terraform variable (which will be named, for example `TF_GITHUB_ORGANIZATION` if the integration namespace is `github`).

People can optionally be given GitHub admin rights setting the `admin` property to `true`.

### Team
This plugin will add a GitHub team for each team in config, then add all team members with a GitHub username to that team. This can be used for both callouts and permissions in GitHub, instead of manually adding team members to e.g. PR reviews.

Team leads are added as `maintainers` to their respective GitHub Teams.

If provided in the `organization` config, teams will be added under the specified "parent" teams, one for each given `TeamTypeType` (e.g. `team` vs `guild` vs etc).
