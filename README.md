# mock-developer-doc
This respository will store markdown files to mock the developer documentation files, and will be used for E2E testing (e.g. Github Actions)

Directory Includes...
```
README.md
/.github/workflow/  : contains Github Action workflow files
/doc                : files (mostly .md) copied from 'onflow/cadence' repository
```
The repositories that store the documentation sources are the following: onflow/...
* flow, cadence, flow-cli, flow-js-testing, flow-go-sdk, fcl-js, flow-emulator

## Versions

The docusaurus CLI allows us to create multiple versions of the docs, e.g.

```bash
yarn run docusaurus docs:version 1.2.3
```
