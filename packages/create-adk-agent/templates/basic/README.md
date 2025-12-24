# **PROJECT_NAME**

**DESCRIPTION**

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your API Key

```bash
cp .env.example .env
# Edit .env and add your API key
```

### 3. Start Development

```bash
npm run dev          # Hot reload development
npm run adk:web      # Interactive web UI at http://localhost:8000
npm run adk:run      # CLI runner
```

## Available Scripts

- `npm run dev` - Hot reload development
- `npm run adk:web` - ADK web UI for testing
- `npm run adk:run` - ADK CLI runner
- `npm test` - Run tests
- `npm run build` - Build for production

## Project Structure

```
src/
├── index.ts          # Agent configuration
tests/
└── agents.test.ts    # Agent tests
```

## Learn More

- **[ADK Documentation](https://google.github.io/adk-docs/)** - Complete ADK guide
- **[TypeScript Quickstart](https://google.github.io/adk-docs/get-started/typescript/)** - Getting started tutorial
- **[Building Agents](https://google.github.io/adk-docs/tutorials/)** - Agent tutorials and patterns
