# create-adk-agent

> **The fastest way to start building with Google's Agent Development Kit (ADK)**

Scaffold production-ready ADK TypeScript projects in seconds with best practices, multiple templates, and zero configuration.

**What is ADK?** The [Agent Development Kit](https://google.github.io/adk-docs/) is Google's framework for building AI agents. This tool makes it easy to get started.

## 🚀 Quick Start

```bash
npx create-adk-agent my-agent
```

Or use it non-interactively:

```bash
npx create-adk-agent my-agent --template=basic --modelProvider=gemini --model=gemini-2.0-flash
```

That's it! You'll get a fully configured ADK project with:

- ✅ TypeScript configured for ADK (ES2022, NodeNext)
- ✅ Environment setup with API key validation
- ✅ Working agent examples from official docs
- ✅ Hot reload development with tsx
- ✅ Testing setup with Jest
- ✅ All the tooling (ESLint, Prettier, etc.)

## 💡 Why Use This?

Instead of manually setting up TypeScript, configuring ESM, managing API keys, and copying examples from docs, `create-adk-agent` does it all for you in one command.

**Perfect for:**

- 🎓 Learning ADK quickly with working examples
- 🚀 Starting new ADK projects without boilerplate hassle
- 📦 Getting ADK best practices out of the box
- 🔄 Experimenting with different agent patterns

## ✨ What You Get

## ✨ What You Get

- 🤖 **5 Agent Templates** - Pre-built examples from [official ADK docs](https://google.github.io/adk-docs/) (basic, multi-tool, team, streaming, workflow)
- 🔌 **Multi-Model Ready** - Pre-configured for Gemini, OpenAI, and Anthropic
- ⚡ **Hot Reload** - Instant TypeScript execution with tsx (no build step needed)
- 🔐 **Security Built-in** - Proper `.env` handling with validation and git-ignore
- 🧪 **Testing Included** - Jest configured and ready to go
- 📦 **Best Practices** - TypeScript, ESLint, Prettier, Zod validation

## 📚 Agent Templates

All templates are based on [official ADK documentation examples](https://google.github.io/adk-docs/):

### Basic Agent

Simple agent with time tool - perfect for learning ADK basics.

### Multi-Tool Agent (Default)

Agent with multiple tools (time, weather, calculator) demonstrating tool composition.

### Team Agent

Multi-agent system with coordination, delegation, and sub-agents (greeting + farewell).

### Streaming Agent

Demonstrates real-time streaming responses using ADK Live API.

### Workflow Agent

Sequential workflow patterns with validation, transformation, and saving steps.

## 🎯 Usage

### Simple (Interactive)

Just run the command and answer a few questions:

```bash
npx create-adk-agent my-agent
```

You'll choose:

- Which agent templates to include
- Your preferred model provider (Gemini, OpenAI, or Anthropic)
- Whether to install dependencies now
- Whether to initialize git

### Advanced (Non-Interactive)

Skip prompts by providing options:

```bash
npx create-adk-agent my-agent \
  --templates=basic,multi-tool \
  --modelProvider=gemini \
  --model=gemini-3.0-flash \
  --description="My custom agent" \
  --installDependencies \
  --no-interactive
```

### Options

| Option                  | Type                              | Description                | Default                |
| ----------------------- | --------------------------------- | -------------------------- | ---------------------- |
| `name`                  | string                            | Project name (required)    | -                      |
| `--templates`           | string[]                          | Agent templates to include | `['multi-tool']`       |
| `--modelProvider`       | gemini\|openai\|anthropic\|custom | LLM provider               | `gemini`               |
| `--model`               | string                            | Specific model to use      | Provider's first model |
| `--description`         | string                            | Project description        | `My ADK Agent`         |
| `--directory`           | string                            | Target directory           | Same as name           |
| `--installDependencies` | boolean                           | Run npm install            | Prompt                 |
| `--initGit`             | boolean                           | Initialize git repo        | Prompt                 |
| `--no-interactive`      | boolean                           | Skip prompts               | `false`                |

## 🤖 Supported Models

### Google Gemini (Direct)

- gemini-3.0-flash
- gemini-3.0-pro
- gemini-2.5-flash
- gemini-2.5-pro

### OpenAI (via LiteLLM)

- gpt-5
- gpt-5-mini
- gpt-4o
- gpt-4o-mini

### Anthropic (via LiteLLM)

- claude-4.5-sonnet
- claude-4-sonnet
- claude-4-opus
- claude-3-5-sonnet

**Note:** You can change to any model after project generation. The list above is for initial setup convenience.

## 🎬 Getting Started Workflow

```bash
# 1. Create your project (takes ~10 seconds)
npx create-adk-agent my-agent

# 2. Navigate to project
cd my-agent

# 3. Add your API key
cp .env.example .env
# Edit .env and add your API key (get it from links in the file)

# 4. Start coding! (hot reload enabled)
npm run dev

# 5. Or use ADK DevTools
npm run adk:web    # Beautiful web UI
npm run adk:run    # CLI runner
```

**That's it!** You're now building with ADK. No complex setup, no configuration headaches.

## 🔗 Learn More About ADK

```
my-agent/
├── src/
│   ├── agents/
│   │   ├── basic/          # Basic agent (if selected)
│   │   ├── multi-tool/     # Multi-tool agent (if selected)
│   │   ├── team/           # Team agents (if selected)
│   │   ├── streaming/      # Streaming agent (if selected)
│   │   └── workflow/       # Workflow agent (if selected)
│   └── index.ts            # Entry point with env validation
├── tests/
│   └── agents.test.ts      # Jest tests
├── .env.example            # Environment template (commit this)
├── .env                    # Your API keys (DO NOT COMMIT)
├── .gitignore              # Includes .env patterns
├── package.json            # With tsx, ADK, and dev tools
├── tsconfig.json           # Configured for ESM + NodeNext
└── README.md               # Project-specific documentation
```

## 🔐 Security

**⚠️ Generated projects include:**

- `.env` in `.gitignore` by default
- API key validation on startup
- Clear warnings about committing secrets
- `.env.example` template for sharing

## 🛠️ Development Workflow

After generating your project:

```bash
cd my-agent

# 1. Set up your API key
cp .env.example .env
# Edit .env and add your API key

# 2. Install dependencies (if not done during generation)
npm install

# 3. Start development with hot reload
npm run dev

# 4. Run tests
npm test

# 5. Use ADK DevTools
npm run adk:web    # Web UI
npm run adk:run    # CLI runner
```

## 📚 Documentation

- [ADK Documentation](https://google.github.io/adk-docs/)
- [TypeScript Quick Start](https://google.github.io/adk-docs/get-started/typescript/)
- [Agent Tutorial](https://google.github.io/adk-docs/tutorial/agent/)

## 🤝 Contributing

Contributions welcome! This is an Nx workspace project.

### Development

```bash
# Build the generator
nx build create-adk-agent

# Test locally
nx g @adk-ts-new/create-adk-agent:init test-project

# Run tests
nx test create-adk-agent
```

## 📄 License

MIT © Maina Wycliffe
