import 'dotenv/config';
import { LlmAgent, FunctionTool } from '@google/adk';
import { z } from 'zod';

// Validate environment variables
if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: No API key found!');
  console.error('Please set one of the following in your .env file:');
  console.error('  - GEMINI_API_KEY (for Google Gemini)');
  console.error('  - OPENAI_API_KEY (for OpenAI)');
  console.error('  - ANTHROPIC_API_KEY (for Anthropic/Claude)');
  process.exit(1);
}

// Tool to get current time
const getCurrentTime = new FunctionTool({
  name: 'get_current_time',
  description: 'Returns the current time in the specified timezone.',
  parameters: z.object({
    timezone: z
      .string()
      .optional()
      .describe('The timezone to use (e.g., "America/New_York", "Europe/London")'),
  }),
  execute: ({ timezone = 'UTC' }) => {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { timeZone: timezone });
    return {
      status: 'success',
      report: `The current time in ${timezone} is ${timeString}`,
    };
  },
});

// Create the agent
export const rootAgent = new LlmAgent({
  name: 'hello_time_agent',
  model: __MODEL_CONFIG__,
  description: 'An agent that can tell you the current time in any timezone.',
  instruction: `You are a friendly time-telling assistant. When asked about the time, 
use the get_current_time tool to provide the current time in the requested timezone. 
If no timezone is specified, use UTC as the default.`,
  tools: [getCurrentTime],
});

// Run the agent (for direct execution)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🤖 Hello Time Agent is ready!');
  console.log('Ask me about the time in any timezone.\n');
  
  rootAgent
    .query('What time is it in Tokyo?')
    .then((response) => {
      console.log('Agent response:', response);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
