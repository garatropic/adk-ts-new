export interface InitGeneratorSchema {
  name: string;
  directory?: string;
  description?: string;
  templates?: Array<'basic' | 'multi-tool' | 'team' | 'streaming' | 'workflow'>;
  modelProvider?: 'gemini' | 'openai' | 'anthropic' | 'custom';
  model?: string;
  installDependencies?: boolean;
  initGit?: boolean;
}
