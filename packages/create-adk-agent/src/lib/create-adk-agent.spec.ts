import { createAdkAgent } from './create-adk-agent.js';

describe('createAdkAgent', () => {
  it('should work', () => {
    expect(createAdkAgent()).toEqual('create-adk-agent');
  });
});
