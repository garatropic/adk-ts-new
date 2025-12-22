# GitHub Copilot Instructions for ADK TypeScript Project Generator

## Project Context

This is an **Nx plugin generator** for scaffolding ADK (Agent Development Kit) TypeScript projects. The complete implementation plan is in `IMPLEMENTATION_PLAN.md` at the project root.

## Key Requirements

### 1. Follow the Implementation Plan

- **Always reference** `/IMPLEMENTATION_PLAN.md` for:
  - Project structure and architecture
  - Template examples and their sources
  - Configuration file formats
  - User prompts and flows
  - Security requirements

### 2. Code Generation Guidelines

#### Template Files

- Use **exact code** from official ADK documentation (links in plan)
- Templates should use `__template__` suffix (Nx convention)
- Support EJS templating for dynamic content: `<%= projectName %>`

#### TypeScript Standards

- Strict mode enabled
- ES2022 target
- NodeNext module resolution
- `verbatimModuleSyntax: false` (per ADK docs requirement)
- Use `.js` extensions in imports (ESM requirement)

#### Security First

- Never hardcode API keys
- Always use `.env` files
- Ensure `.env` patterns in `.gitignore`
- Validate environment variables on startup

### 3. Multi-Model Provider Support

Generate code that supports:

- **Google Gemini**: Direct string model (e.g., `'gemini-3.0-flash'`)
- **OpenAI**: Via LiteLLM wrapper (`new LiteLlm({ model: 'openai/gpt-4o' })`)
- **Anthropic**: Via LiteLLM wrapper (`new LiteLlm({ model: 'anthropic/claude-3-5-sonnet' })`)

### 4. Development Tools

#### tsx Integration

- Use `tsx watch` for development scripts
- No build step in development mode
- Hot reload on file changes
- Example: `"dev": "tsx watch src/index.ts"`

#### Testing

- Jest with ts-jest preset
- Tests in `/tests` directory
- Use `*.test.ts` naming convention

#### Code Quality

- ESLint with TypeScript plugin
- Prettier for formatting
- Consistent configuration across templates

### 5. Nx Generator Structure

```typescript
// Generator should:
export async function initGenerator(tree: Tree, options: Schema) {
  // 1. Validate options
  // 2. Generate files from templates
  // 3. Install dependencies (optional)
  // 4. Initialize git (optional)
  // 5. Return tasks to run
}
```

Use Nx devkit utilities:

- `generateFiles()` for template processing
- `addProjectConfiguration()` if needed
- `formatFiles()` for formatting
- `installPackagesTask()` for dependencies

### 6. Interactive Prompts

When generating prompt code, support:

- **Multi-select** for templates (inquirer checkbox)
- **Single-select** for model provider (inquirer list)
- **Dynamic model list** based on provider selection
- **Boolean prompts** for optional features

### 7. Template Selection Logic

```typescript
// Generate only selected templates
if (options.templates.includes('basic')) {
  // Generate basic agent files
}
if (options.templates.includes('multi-tool')) {
  // Generate multi-tool agent files (default)
}
// ... etc
```

### 8. README Generation

Generate dynamic README that includes:

- Only selected templates in "Available Agents" section
- Security warnings about API keys
- Model-specific environment variable instructions
- tsx development workflow explanation
- Troubleshooting section

### 9. Environment Configuration

Generate `.env.example` with:

- Comments for each API key source
- All supported providers (commented)
- Clear instructions

Generate API key validation in `src/index.ts`:

- Check for required keys based on model
- Provide helpful error messages
- Exit gracefully if keys missing

### 10. Dependencies

#### Production

- `@google/adk`: ^0.2.0
- `@google/adk-devtools`: ^0.2.0
- `dotenv`: ^16.4.0
- `zod`: ^3.23.0

#### Development

- `tsx`: ^4.7.0 (for instant TS execution)
- `typescript`: ^5.9.3
- `@types/node`: ^20.10.0
- ESLint & Prettier tooling
- Jest & ts-jest for testing

## Code Style Preferences

### Import Statements

```typescript
// Named imports for ADK
import { LlmAgent, FunctionTool } from '@google/adk';
import { z } from 'zod';

// Default import for dotenv
import 'dotenv/config';
```

### Tool Definitions

```typescript
// Use Zod for parameter validation
const myTool = new FunctionTool({
  name: 'tool_name',
  description: 'Clear description of what the tool does.',
  parameters: z.object({
    param: z.string().describe('Parameter description'),
  }),
  execute: ({ param }) => {
    return { status: 'success', report: 'Result' };
  },
});
```

### Agent Definitions

```typescript
export const rootAgent = new LlmAgent({
  name: 'agent_name',
  model: 'gemini-3.0-flash', // or LiteLlm wrapper
  description: 'Brief agent purpose for delegation.',
  instruction: `Detailed instructions for the agent behavior.`,
  tools: [myTool],
});
```

## File Naming Conventions

- TypeScript files: `kebab-case.ts`
- Agent files: `agent.ts` or `[name]-agent.ts`
- Tool files: `[category].ts` (e.g., `time.ts`, `weather.ts`)
- Test files: `[name].test.ts`
- Template files: `[name]__template__` suffix

## Common Pitfalls to Avoid

❌ **Don't:**

- Hardcode API keys in any file
- Use deprecated Gemini models (gemini-1.5-x)
- Forget `.js` extensions in ESM imports
- Use `ts-node` instead of `tsx`
- Include build step in dev workflow

✅ **Do:**

- Reference official ADK docs for code examples
- Validate all environment variables
- Use tsx for development speed
- Keep templates simple and focused
- Provide clear error messages

## Testing Guidelines

```typescript
// Test agent initialization
describe('BasicAgent', () => {
  it('should initialize with correct configuration', () => {
    expect(rootAgent.name).toBe('hello_time_agent');
    expect(rootAgent.tools).toHaveLength(1);
  });
});
```

## When in Doubt

1. Check `IMPLEMENTATION_PLAN.md` first
2. Reference official ADK docs: https://google.github.io/adk-docs/
3. Follow Nx plugin conventions: https://nx.dev/extending-nx/recipes/local-generators
4. Keep it simple and focused on developer experience

## Success Metrics

Generated projects should:

- ✅ Run immediately with `npm run dev`
- ✅ Have zero security warnings about API keys
- ✅ Include working examples from official docs
- ✅ Support multiple LLM providers easily
- ✅ Provide excellent error messages
- ✅ Include comprehensive documentation
