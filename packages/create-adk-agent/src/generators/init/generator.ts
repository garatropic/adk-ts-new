import {
  Tree,
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  names,
} from '@nx/devkit';
import * as path from 'path';
import { InitGeneratorSchema } from './schema.js';

// Model options based on provider
// Note: Users can change to any model in their generated project
// This list is just for initial selection during project creation
const MODEL_OPTIONS = {
  gemini: [
    'gemini-3.0-flash',
    'gemini-3.0-pro',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
  ],
  openai: ['gpt-5', 'gpt-5-mini', 'gpt-4o', 'gpt-4o-mini'],
  anthropic: [
    'claude-4.5-sonnet',
    'claude-4-sonnet',
    'claude-4-opus',
    'claude-3-5-sonnet',
  ],
  custom: [],
};

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const projectRoot = options.directory
    ? joinPathFragments(options.directory, options.name)
    : options.name;

  // Set default templates if none selected
  if (!options.templates || options.templates.length === 0) {
    options.templates = ['multi-tool'];
  }

  // Set default model provider
  if (!options.modelProvider) {
    options.modelProvider = 'gemini';
  }

  // Set default model based on provider
  if (!options.model) {
    const provider = options.modelProvider as keyof typeof MODEL_OPTIONS;
    options.model = MODEL_OPTIONS[provider]?.[0] || 'gemini-3.0-flash';
  }

  // Generate project files
  const substitutions = {
    ...names(options.name),
    projectName: options.name,
    description: options.description || 'My ADK Agent',
    modelProvider: options.modelProvider,
    model: options.model,
    templates: options.templates,
    hasBasic: options.templates.includes('basic'),
    hasMultiTool: options.templates.includes('multi-tool'),
    hasTeam: options.templates.includes('team'),
    hasStreaming: options.templates.includes('streaming'),
    hasWorkflow: options.templates.includes('workflow'),
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    substitutions,
  );

  // Format files
  await formatFiles(tree);

  // Print success message
  console.log(`
✅ ADK Agent project created successfully!

📁 Project: ${projectRoot}
🤖 Model: ${options.model}
📦 Templates: ${options.templates.join(', ')}

🚀 Next steps:
  1. cd ${projectRoot}
  2. Copy .env.example to .env and add your API key
  3. npm install${options.installDependencies ? ' (running now...)' : ''}
  4. npm run dev

📚 Documentation: https://google.github.io/adk-docs/
`);

  // Return task for dependency installation if requested
  if (options.installDependencies) {
    return installPackagesTask(tree);
  }

  return () => {};
}

export default initGenerator;
