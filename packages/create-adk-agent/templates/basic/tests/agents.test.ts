import { describe, it, expect } from '@jest/globals';
import { rootAgent } from '../src/index.js';

describe('Time Agent', () => {
  it('should have correct name', () => {
    expect(rootAgent.name).toBe('hello_time_agent');
  });

  it('should have get_current_time tool', () => {
    expect(rootAgent.tools).toHaveLength(1);
    expect(rootAgent.tools[0].name).toBe('get_current_time');
  });

  it('should return time when queried', async () => {
    const response = await rootAgent.query('What time is it?');
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  }, 30000);
});
