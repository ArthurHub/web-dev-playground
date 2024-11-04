import { HealthAssistant } from './health-assistant.js';

async function main(): Promise<void> {
  const assistant = new HealthAssistant();

  console.log('\n---\n');

  await assistant.getPatientData();

  console.log('\n\n---\n');
}

await main();
