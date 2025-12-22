#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the arguments passed to the script (excluding node and script path)
const args = process.argv.slice(2);

// Check if a project name was provided
if (args.length === 0) {
  console.error('❌ Error: Please provide a project name');
  console.error('Usage: npx create-adk-agent <project-name> [options]');
  console.error('');
  console.error('Example:');
  console.error('  npx create-adk-agent my-agent');
  console.error('  npx create-adk-agent my-agent --templates=basic,multi-tool --no-interactive');
  process.exit(1);
}

// Build the nx command
const generatorPath = resolve(__dirname, '..');
const command = `npx --yes nx g ${generatorPath}:init ${args.join(' ')}`;

console.log('🚀 Creating your ADK agent project...');
console.log('');

try {
  // Execute the nx generator command
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch (error) {
  console.error('');
  console.error('❌ Failed to create project');
  process.exit(1);
}
