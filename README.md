# create-adk-agent

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

> **Scaffold Google ADK TypeScript projects in seconds**

This Nx workspace contains `create-adk-agent` - a generator that makes it incredibly easy to start building AI agents with [Google's Agent Development Kit (ADK)](https://google.github.io/adk-docs/).

## 📦 Package: create-adk-agent

**Stop wasting time on setup. Start building agents.**

`create-adk-agent` generates production-ready ADK TypeScript projects with everything configured:

- 🤖 **5 Agent Templates** - Working examples from [official ADK docs](https://google.github.io/adk-docs/)
- 🔌 **Multi-Model Ready** - Pre-configured for Gemini, OpenAI, Anthropic
- ⚡ **Hot Reload** - Instant TypeScript execution with tsx
- 🔐 **Security Built-in** - Proper `.env` handling
- 🧪 **Testing Ready** - Jest configured

### Quick Start

```bash
npx create-adk-agent my-agent
```

That's it! You get a fully configured ADK project ready for development.

[📚 Full Documentation →](./packages/create-adk-agent/README.md) | [🚀 ADK Docs →](https://google.github.io/adk-docs/)

---

## 🛠️ Development

### Setup

```sh
pnpm install
```

### Build the Generator

```sh
nx build create-adk-agent
```

### Test Locally

```sh
# Generate a test project
nx g @adk-ts-new/create-adk-agent:init test-project

# Test with different options
nx g @adk-ts-new/create-adk-agent:init my-agent \
  --templates=team,workflow \
  --modelProvider=openai \
  --model=gpt-5 \
  --no-interactive
```

### Run Tests

```sh
nx test create-adk-agent
```

## 📤 Publishing

```sh
# Dry run to verify package contents
cd packages/create-adk-agent
npm run publish:dry-run

# Publish to npm
npm run publish:npm
```

## 📁 Project Structure

```
adk-ts-new/
├── packages/
│   └── create-adk-agent/      # Main generator package
│       ├── src/
│       │   └── generators/
│       │       └── init/
│       │           ├── files/         # Template files
│       │           ├── generator.ts   # Generator logic
│       │           └── schema.json    # CLI options
│       ├── generators.json    # Generator registration
│       ├── package.json       # Package metadata
│       └── README.md          # Package documentation
├── IMPLEMENTATION_PLAN.md     # Detailed implementation plan
└── README.md                  # This file
```

## 🤝 Contributing

Contributions welcome! Please see [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for architecture details.

## 📄 License

MIT © Maina Wycliffe

---

## Nx Workspace Documentation

✨ This is an [Nx workspace](https://nx.dev). [Learn more about Nx &raquo;](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Nx Commands

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
