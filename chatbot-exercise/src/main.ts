import { HealthAssistantThread } from './health-assistant-thread.js';

async function main(): Promise<void> {
  const thread = new HealthAssistantThread();

  console.log('\n---\n');

  await thread.run();

  console.log('\n\n---\n');
}

await main();
