# __PROJECT_NAME__

__DESCRIPTION__

## Features

- ✅ TypeScript support with ES2022 target
- ✅ Hot reload development with tsx
- ✅ Multiple LLM provider support (Gemini, OpenAI, Anthropic)
- ✅ Environment-based configuration
- ✅ Jest testing setup
- ✅ ESLint and Prettier configured

## Prerequisites

- Node.js 20+ (for ADK compatibility)
- An API key from your chosen LLM provider

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
# For Google Gemini (default)
GEMINI_API_KEY=your_api_key_here

# OR for OpenAI
OPENAI_API_KEY=your_openai_key_here

# OR for Anthropic
ANTHROPIC_API_KEY=your_anthropic_key_here
```

### 3. Run in Development Mode

```bash
npm run dev
```

This starts the agent with hot reload - any code changes will automatically restart the agent.

### 4. Run in Production Mode

```bash
npm run build
npm run prod
```

## Project Structure

```
src/
├── index.ts          # Main entry point with agent configuration
└── tools/            # Custom tools for the agent
tests/
└── agents.test.ts    # Agent tests
```

## Available Scripts

- `npm run dev` - Start with hot reload (development)
- `npm start` - Run once (no reload)
- `npm run build` - Build TypeScript to JavaScript
- `npm run prod` - Run built JavaScript
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Using Different LLM Providers

### Google Gemini (Default)

```typescript
import { LlmAgent } from '@google/adk';

const agent = new LlmAgent({
  model: 'gemini-2.0-flash',
  // ...
});
```

### OpenAI via LiteLLM

```typescript
import { LlmAgent, LiteLlm } from '@google/adk';

const agent = new LlmAgent({
  model: new LiteLlm({ model: 'openai/gpt-4o' }),
  // ...
});
```

### Anthropic via LiteLLM

```typescript
import { LlmAgent, LiteLlm } from '@google/adk';

const agent = new LlmAgent({
  model: new LiteLlm({ model: 'anthropic/claude-3-5-sonnet' }),
  // ...
});
```

## Security Notes

⚠️ **Never commit your `.env` file or API keys to version control!**

The `.gitignore` is configured to exclude:
- `.env` and `.env.local`
- API keys and sensitive data

## Troubleshooting

### Missing API Key Error

If you see an error about missing API keys:

1. Ensure `.env` file exists in project root
2. Verify the correct API key variable is set
3. Check that the API key is valid

### TypeScript Import Errors

ADK requires `verbatimModuleSyntax: false` in `tsconfig.json`. This is already configured.

### Module Resolution Issues

Make sure to use `.js` extensions in imports:

```typescript
import { myFunction } from './myModule.js';
```

## Learn More

- [ADK Documentation](https://google.github.io/adk-docs/)
- [ADK GitHub](https://github.com/google/adk)

## License

MIT
