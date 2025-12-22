# ADK TypeScript Project Generator - Implementation Plan

**Date:** 22 December 2025  
**Project:** `create-adk-agent` - Nx plugin for scaffolding ADK TypeScript projects

## 🎯 Project Overview

Create an Nx plugin package that scaffolds ADK (Agent Development Kit) TypeScript projects with all necessary configurations, multiple example templates from official docs, and modern development tooling.

## 📦 Package Details

- **Package Name:** `@adk-ts-new/create-adk-agent` (or unscoped: `create-adk-agent`)
- **Type:** Nx Plugin Generator
- **Target:** npm registry
- **Usage:** `npx create-adk-agent my-agent`

## ✨ Key Features

### 1. Multiple Template Selection

Users can select one or more agent templates to include in their project:

- ✅ Basic Agent (getCurrentTime - from docs quickstart)
- ✅ Multi-tool Agent (weather + time - from docs quickstart)
- ✅ Agent Team (greeting + farewell + weather delegation)
- ✅ Streaming Agent (Live API voice/text)
- ✅ Workflow Agent (Sequential/Loop/Parallel)

### 2. Multi-Model Provider Support

- Google Gemini (gemini-3.0-flash, gemini-3.0-pro, gemini-2.5-flash, gemini-2.0-flash)
- OpenAI (gpt-4o, gpt-4o-mini, gpt-4-turbo) via LiteLLM
- Anthropic (claude-3-5-sonnet, claude-3-opus, claude-3-haiku) via LiteLLM
- Custom/Other (manual configuration)

### 3. Modern Development Stack

- **tsx** - Instant TypeScript execution with watch mode (no build step in dev)
- **TypeScript 5.9.3** - Latest stable
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Zod** - Schema validation for tools

### 4. Security-First Approach

- `.env.example` template (committed)
- `.env` and `.env.local` in `.gitignore`
- Clear security warnings in README
- API key validation on startup

## 📋 Interactive Prompts

```bash
npx create-adk-agent my-agent

? Select agent templates to include: (Use <space> to select, <a> to toggle all)
 ◯ Basic Agent (getCurrentTime - from docs quickstart)
 ◯ Multi-tool Agent (weather + time - from docs quickstart)
 ◯ Agent Team (greeting + farewell + weather delegation)
 ◯ Streaming Agent (Live API voice/text)
 ◯ Workflow Agent (Sequential/Loop/Parallel)

? Project name: (my-agent)
? Description: (My ADK Agent)

? Select your preferred model provider: (Use arrow keys)
  ❯ Google Gemini (Google AI Studio or Vertex AI)
    OpenAI (GPT models via LiteLLM)
    Anthropic (Claude models via LiteLLM)
    Other/Custom (Manual configuration)

? Select model: (Dynamic based on provider)
  # If Google Gemini:
  ❯ gemini-3.0-flash
    gemini-3.0-pro
    gemini-2.5-flash
    gemini-2.0-flash

  # If OpenAI:
  ❯ gpt-4o
    gpt-4o-mini
    gpt-4-turbo

  # If Anthropic:
  ❯ claude-3-5-sonnet
    claude-3-opus
    claude-3-haiku

? Install dependencies now? (Y/n)
? Initialize git repository? (Y/n)
```

## 📁 Generated Project Structure

```
my-agent/
├── .env.example              # Environment template (committed)
├── .env                      # User's actual keys (gitignored)
├── .gitignore               # Includes .env, .env.local, .env*.local
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config (verbatimModuleSyntax: false)
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── jest.config.ts           # Jest configuration
├── README.md                # Dynamic based on selected templates
├── src/
│   ├── index.ts             # Main entry point with API key validation
│   ├── agents/              # Agent implementations
│   │   ├── basic/           # If "Basic Agent" selected
│   │   │   └── agent.ts
│   │   ├── multi-tool/      # If "Multi-tool" selected (default)
│   │   │   └── agent.ts
│   │   ├── team/            # If "Agent Team" selected
│   │   │   ├── root-agent.ts
│   │   │   ├── greeting-agent.ts
│   │   │   └── farewell-agent.ts
│   │   ├── streaming/       # If "Streaming" selected
│   │   │   └── agent.ts
│   │   └── workflow/        # If "Workflow" selected
│   │       └── agent.ts
│   └── tools/               # Shared reusable tools
│       ├── time.ts          # Time-related tools
│       ├── weather.ts       # Weather tools
│       └── greetings.ts     # Greeting/farewell tools
└── tests/
    └── agents/
        └── [matching test files for selected templates]
```

## 📄 Configuration Files

### package.json

```json
{
  "name": "my-agent",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "dev:agent": "tsx watch src/agents/multi-tool/agent.ts",
    "start": "tsx src/index.ts",
    "build": "tsc",
    "prod": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "adk:web": "adk web",
    "adk:run": "adk run src/agents/multi-tool/agent.ts"
  },
  "dependencies": {
    "@google/adk": "^0.2.0",
    "@google/adk-devtools": "^0.2.0",
    "dotenv": "^16.4.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "prettier": "^3.2.0",
    "ts-jest": "^29.1.0",
    "tsx": "^4.7.0",
    "typescript": "^5.9.3"
  }
}
```

### tsconfig.json (per ADK docs)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": false,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### .env.example

```bash
# Google Gemini API Key
# Get your key from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_google_api_key_here

# OR use Vertex AI (for Google Cloud)
# GOOGLE_GENAI_USE_VERTEXAI=true
# GOOGLE_CLOUD_PROJECT=your-project-id
# GOOGLE_CLOUD_LOCATION=us-central1

# OpenAI API Key (if using OpenAI models)
# Get your key from: https://platform.openai.com/api-keys
# OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API Key (if using Claude models)
# Get your key from: https://console.anthropic.com/settings/keys
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### .gitignore

```
# Environment files - NEVER commit these!
.env
.env.local
.env*.local

# Dependencies
node_modules/

# Build output
dist/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Test coverage
coverage/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### .eslintrc.json

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "plugins": ["@typescript-eslint"],
  "env": {
    "node": true,
    "es2022": true
  },
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### jest.config.ts

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

## 🎨 Template Examples

### 1. Basic Agent Template

**Source:** https://google.github.io/adk-docs/get-started/typescript/#create-an-agent-project

```typescript
import { LlmAgent, FunctionTool } from '@google/adk';
import { z } from 'zod';

const getCurrentTime = new FunctionTool({
  name: 'get_current_time',
  description: 'Returns the current time in a specified city.',
  parameters: z.object({
    city: z
      .string()
      .describe('The name of the city for which to retrieve the current time.'),
  }),
  execute: ({ city }) => {
    return {
      status: 'success',
      report: `The current time in ${city} is 10:30 AM`,
    };
  },
});

export const rootAgent = new LlmAgent({
  name: 'hello_time_agent',
  model: 'gemini-2.5-flash',
  description: 'Tells the current time in a specified city.',
  instruction: `You are a helpful assistant that tells the current time in a city.
                Use the 'getCurrentTime' tool for this purpose.`,
  tools: [getCurrentTime],
});
```

### 2. Multi-tool Agent Template

**Source:** https://google.github.io/adk-docs/get-started/quickstart/

Includes both `getWeather` and `getCurrentTime` tools working together.

### 3. Agent Team Template

**Source:** https://google.github.io/adk-docs/tutorials/agent-team/

- Root orchestrator agent
- Greeting sub-agent with `sayHello` tool
- Farewell sub-agent with `sayGoodbye` tool
- Weather agent with delegation capabilities

### 4. Streaming Agent Template

**Source:** https://google.github.io/adk-docs/get-started/streaming/

Real-time streaming with Live API support.

### 5. Workflow Agent Template

**Source:** https://google.github.io/adk-docs/agents/workflow-agents/

Sequential, Loop, or Parallel execution patterns.

## 🔧 Key Implementation Details

### tsx Integration

- Use `tsx watch` for development with hot reload
- No build step needed during development
- Instant TypeScript execution
- Production builds still use `tsc` for type checking

### Environment Variable Handling

```typescript
// src/index.ts
import 'dotenv/config';

const modelString = rootAgent.model?.toString() || 'gemini';

if (modelString.includes('gemini') && !process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  console.error('📝 Copy .env.example to .env and add your API key');
  process.exit(1);
}
```

### Multi-Model Support Example

```typescript
// For Google models (default):
model: 'gemini-3.0-flash';

// For OpenAI:
import { LiteLlm } from '@google/adk/models';
model: new LiteLlm({ model: 'openai/gpt-4o' });

// For Anthropic:
model: new LiteLlm({ model: 'anthropic/claude-3-5-sonnet-20241022' });
```

## 📚 README Sections

The generated README.md should include:

1. **Quick Start** - Environment setup, installation, running
2. **Development Workflow** - tsx with watch mode explanation
3. **Project Structure** - File organization
4. **Security Notes** - API key safety, .gitignore verification
5. **Available Agents** - Documentation for each selected template
6. **Model Configuration** - How to switch between providers
7. **Testing** - Running tests and coverage
8. **Code Quality** - Linting and formatting
9. **Troubleshooting** - Common issues and solutions
10. **Documentation Links** - Official ADK docs, LiteLLM, tsx

## 🚀 Development Scripts

Users will have access to:

- `npm run dev` - Development with auto-reload (recommended)
- `npm run dev:agent` - Watch specific agent
- `npm start` - Run once without watch
- `npm run build` - Compile for production
- `npm run prod` - Run compiled production build
- `npm test` - Run tests
- `npm test:watch` - Tests in watch mode
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run adk:web` - ADK web UI
- `npm run adk:run` - ADK terminal interface

## 🏗️ Nx Plugin Structure

```
packages/create-adk-agent/
├── package.json
├── generators.json              # Register generators
├── tsconfig.json
├── src/
│   ├── index.ts                # Main exports
│   └── generators/
│       └── init/               # Main generator
│           ├── schema.json     # CLI options schema
│           ├── schema.d.ts     # TypeScript types
│           ├── generator.ts    # Generator logic
│           └── files/          # Template files
│               ├── package.json__template__
│               ├── tsconfig.json__template__
│               ├── .env.example__template__
│               ├── .gitignore__template__
│               ├── README.md__template__
│               ├── src/
│               │   ├── index.ts__template__
│               │   └── agents/
│               │       ├── basic/
│               │       │   └── agent.ts__template__
│               │       ├── multi-tool/
│               │       │   └── agent.ts__template__
│               │       └── [other templates]
│               └── [other config files]
└── README.md
```

## ✅ Success Criteria

1. ✅ One-command scaffold: `npx create-adk-agent my-agent`
2. ✅ Multiple template selection (checkbox)
3. ✅ Multi-model provider support (Gemini, OpenAI, Anthropic)
4. ✅ Secure environment variable handling
5. ✅ tsx for instant TypeScript execution with watch mode
6. ✅ All code examples from official ADK docs
7. ✅ Full TypeScript setup (strict mode)
8. ✅ Linting and formatting configured
9. ✅ Testing framework ready
10. ✅ Comprehensive README with security warnings
11. ✅ Production-ready build process
12. ✅ Publishable to npm

## 🎯 Next Steps

1. Create Nx plugin package structure
2. Implement generator with schema
3. Create template files for all agent types
4. Add multi-model provider logic
5. Implement interactive prompts
6. Create comprehensive tests
7. Write documentation
8. Test end-to-end locally
9. Prepare for npm publishing

## 📝 Notes

- All agent code should be **exact copies** from official ADK documentation
- Security is paramount - emphasize .env.example vs .env
- tsx provides superior DX compared to ts-node or build-watch setups
- Support both ESM and CommonJS where possible
- Keep templates simple and focused on learning
- Provide clear migration paths between templates
