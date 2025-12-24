# create-adk-agent

> Scaffold production-ready [Google ADK](https://google.github.io/adk-docs/) TypeScript projects in seconds

## Quick Start

```bash
npx create-adk-agent my-agent
```

Creates a TypeScript project pre-configured for building AI agents with Google's Agent Development Kit.

## What You Get

- ✅ Working agent examples from [ADK docs](https://google.github.io/adk-docs/get-started/typescript/)
- ✅ TypeScript configured (ES2022, NodeNext, ESM)
- ✅ Hot reload with tsx (instant execution)
- ✅ Multi-model support (Gemini, OpenAI, Anthropic)
- ✅ Environment setup with API key validation
- ✅ Testing with Jest, linting with ESLint

## Usage

**Interactive:**

```bash
npx create-adk-agent my-agent
```

**Non-interactive:**

```bash
npx create-adk-agent my-agent \
  --template=basic \
  --modelProvider=gemini \
  --model=gemini-2.5-flash
```

## After Generation

```bash
cd my-agent

# Add your API key
cp .env.example .env
# Edit .env with your API key

# Start development
npm run dev

# Use ADK DevTools
npm run adk:web    # Interactive web UI
npm run adk:run    # CLI runner
```

## Templates

- **basic** - Single agent with one tool ([docs example](https://google.github.io/adk-docs/get-started/typescript/#define-the-agent-code))
- **multi-tool** - Agent with multiple tools (default)

## Learn More

- **[ADK Documentation](https://google.github.io/adk-docs/)** - Official ADK guide
- **[TypeScript Quickstart](https://google.github.io/adk-docs/get-started/typescript/)** - Getting started
- **[Building Agents](https://google.github.io/adk-docs/tutorials/)** - Agent tutorials

## License

MIT
