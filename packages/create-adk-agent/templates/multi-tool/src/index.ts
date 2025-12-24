import { FunctionTool, LlmAgent } from '@google/adk';
import 'dotenv/config';
import { z } from 'zod';

// Validate environment variables
if (
  !process.env.GEMINI_API_KEY &&
  !process.env.OPENAI_API_KEY &&
  !process.env.ANTHROPIC_API_KEY
) {
  console.error('❌ Error: No API key found!');
  console.error('Please set one of the following in your .env file:');
  console.error('  - GEMINI_API_KEY (for Google Gemini)');
  console.error('  - OPENAI_API_KEY (for OpenAI)');
  console.error('  - ANTHROPIC_API_KEY (for Anthropic/Claude)');
  process.exit(1);
}

/* Mock tool implementations */
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

const getWeather = new FunctionTool({
  name: 'get_weather',
  description: 'Returns the current weather for a specified city.',
  parameters: z.object({
    city: z
      .string()
      .describe('The name of the city for which to retrieve the weather.'),
  }),
  execute: ({ city }) => {
    return {
      status: 'success',
      report: `The weather in ${city} is sunny and 72°F`,
    };
  },
});

export const rootAgent = new LlmAgent({
  name: 'multi_tool_agent',
  model: __MODEL_CONFIG__,
  description: 'Provides current time and weather information for cities.',
  instruction: `You are a helpful assistant that provides time and weather information.
                Use the 'getCurrentTime' tool to get the time in a city.
                Use the 'getWeather' tool to get weather information for a city.`,
  tools: [getCurrentTime, getWeather],
});
