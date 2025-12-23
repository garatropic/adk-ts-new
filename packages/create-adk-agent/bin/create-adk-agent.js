#!/usr/bin/env node

// @ts-check
import { blue, green, red, reset, yellow, cyan } from 'kolorist';
import minimist from 'minimist';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';

const argv = minimist(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();

// Template configurations
const TEMPLATES = [
  {
    name: 'basic',
    display: 'Basic Agent',
    description: 'Single agent with one tool (time example)',
    color: green,
  },
  {
    name: 'multi-tool',
    display: 'Multi-Tool Agent',
    description: 'Agent with multiple tools (recommended)',
    color: blue,
  },
  {
    name: 'streaming',
    display: 'Streaming Agent',
    description: 'Agent with Live API streaming support',
    color: cyan,
  },
  {
    name: 'team',
    display: 'Multi-Agent Team',
    description: 'Multiple agents working together',
    color: yellow,
  },
  {
    name: 'workflow',
    display: 'Workflow Agent',
    description: 'Sequential and parallel execution patterns',
    color: yellow,
  },
];

// Model provider configurations
const MODEL_PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-2.0-flash', 'gemini-2.0-flash-thinking-exp-01-21', 'gemini-1.5-pro'],
    apiKeyVar: 'GEMINI_API_KEY',
    importStatement: "import { LlmAgent, FunctionTool } from '@google/adk';",
    modelConfig: (model) => `'${model}'`,
  },
  openai: {
    name: 'OpenAI',
    models: ['openai/gpt-4o', 'openai/gpt-4o-mini', 'openai/gpt-4-turbo'],
    apiKeyVar: 'OPENAI_API_KEY',
    importStatement: "import { LlmAgent, FunctionTool, LiteLlm } from '@google/adk';",
    modelConfig: (model) => `new LiteLlm({ model: '${model}' })`,
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    models: ['anthropic/claude-3-5-sonnet', 'anthropic/claude-3-opus', 'anthropic/claude-3-haiku'],
    apiKeyVar: 'ANTHROPIC_API_KEY',
    importStatement: "import { LlmAgent, FunctionTool, LiteLlm } from '@google/adk';",
    modelConfig: (model) => `new LiteLlm({ model: '${model}' })`,
  },
};

const renameFiles = {
  _gitignore: '.gitignore',
};

function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(pathToCheck) {
  const files = fs.readdirSync(pathToCheck);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function replacePlaceholders(root, files, config) {
  for (const file of Array.isArray(files) ? files : [files]) {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) continue;
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const newFileContent = Object.keys(config).reduce(
      (content, placeholder) =>
        content.replace(new RegExp(placeholder, 'g'), config[placeholder]),
      fileContent,
    );
    fs.writeFileSync(filePath, newFileContent);
  }
}

async function init() {
  let targetDir = formatTargetDir(argv._[0]);
  let template = argv.template || argv.t;
  let modelProvider = argv.modelProvider || argv.mp;
  let model = argv.model || argv.m;
  let description = argv.description || argv.d;

  const defaultTargetDir = 'my-adk-agent';
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir;

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type: description ? null : 'text',
          name: 'description',
          message: reset('Project description:'),
          initial: 'My ADK Agent',
        },
        {
          type: template ? null : 'select',
          name: 'template',
          message: reset('Select a template:'),
          choices: TEMPLATES.map((t) => ({
            title: `${t.color(t.display)} - ${t.description}`,
            value: t.name,
          })),
        },
        {
          type: modelProvider ? null : 'select',
          name: 'modelProvider',
          message: reset('Select LLM provider:'),
          choices: Object.entries(MODEL_PROVIDERS).map(([key, value]) => ({
            title: value.name,
            value: key,
          })),
        },
        {
          type: (prev, values) => {
            const provider = modelProvider || values.modelProvider;
            return model || !provider ? null : 'select';
          },
          name: 'model',
          message: reset('Select model:'),
          choices: (prev, values) => {
            const provider = modelProvider || values.modelProvider;
            return MODEL_PROVIDERS[provider].models.map((m) => ({
              title: m,
              value: m,
            }));
          },
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  // Extract values from prompts
  const {
    overwrite,
    packageName,
    description: promptDescription,
    template: promptTemplate,
    modelProvider: promptModelProvider,
    model: promptModel,
  } = result;

  // Use CLI args or prompt values
  template = template || promptTemplate || 'basic';
  modelProvider = modelProvider || promptModelProvider || 'gemini';
  model = model || promptModel || MODEL_PROVIDERS[modelProvider].models[0];
  description = description || promptDescription || 'My ADK Agent';

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  console.log(`\n${green('✓')} Scaffolding project in ${root}...\n`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    'templates',
    template,
  );

  if (!fs.existsSync(templateDir)) {
    console.error(red(`✖ Error: Template "${template}" not found!`));
    process.exit(1);
  }

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);

    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  // Copy all template files
  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file);
  }

  // Handle package.json separately
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'),
  );
  pkg.name = packageName || getProjectName();
  pkg.description = description;

  write('package.json', JSON.stringify(pkg, null, 2));

  // Replace placeholders
  const providerConfig = MODEL_PROVIDERS[modelProvider];
  const modelConfig = providerConfig.modelConfig(model);

  replacePlaceholders(root, 'README.md', {
    __PROJECT_NAME__: pkg.name,
    __DESCRIPTION__: description,
  });

  replacePlaceholders(root, 'src/index.ts', {
    __MODEL_CONFIG__: modelConfig,
  });

  // Update imports if needed (for LiteLLM)
  if (modelProvider !== 'gemini') {
    replacePlaceholders(root, 'src/index.ts', {
      "import { LlmAgent, FunctionTool } from '@google/adk';":
        providerConfig.importStatement,
    });
  }

  console.log(`${green('✓')} Project created successfully!\n`);
  console.log(`${cyan('Next steps:')}\n`);
  
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  
  console.log(`  npm install`);
  console.log(`  cp .env.example .env`);
  console.log(`  ${yellow('# Edit .env and add your API key')}`);
  console.log(`  npm run dev\n`);
  
  console.log(`${cyan('Configuration:')}`);
  console.log(`  Template: ${green(template)}`);
  console.log(`  Provider: ${green(providerConfig.name)}`);
  console.log(`  Model: ${green(model)}`);
  console.log(`  API Key: ${yellow(providerConfig.apiKeyVar)}\n`);
}

init().catch((e) => {
  console.error(e);
});
