import { PatientData, ThreadActor, ThreadMessage } from './entities.js';
import { HealthAssistantClient } from './health-assistant-client.js';
import * as readline from 'readline/promises';

export class HealthAssistantThread {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /** OpenAI client to interact with */
  private readonly client: HealthAssistantClient;

  /** All previous messages in the thread */
  private messages: ThreadMessage[] = [];

  /** Use name and age as collected from interaction */
  private patientData?: PatientData;

  constructor() {
    this.client = new HealthAssistantClient(process.stdout, 'YOUR_API_KEY');
  }

  public async run() {
    // Clear and init messages in the thread for conversation
    this.init();

    // step 1: get patient data
    console.log(`${this.messages.at(-1)?.content}\n`);

    let attempts = 3;
    while (!this.patientData && attempts-- > 0) {
      await this.getInputFromUser();
      const [message, data] = await this.client.getPatientData(this.messages);
      if (message) {
        this.messages.push(message);
        console.log(`\n${message.content}\n`);
      }
      if (data) {
        this.setPatientData(data);
      }
    }

    if (!this.patientData) {
      return;
    }

    // step 2: question-answer loop
    for (let i = 0; i < 3; i++) {
      const text = await this.getInputFromUser();
      console.log();
      const message = await this.client.respondToQueryStream(this.messages);
      if (message) {
        this.messages.push(message);
      }
    }

    // step 3: goodbye message
    console.log('\n\nThis is all the questions I can answer at this time. Thank you.\n');
  }

  private async getInputFromUser(): Promise<void> {
    let answer;
    while (!answer) {
      answer = (await this.rl.question('> ')).trim();
    }
    this.messages.push({ actor: ThreadActor.User, content: answer });
  }

  private setPatientData(data: PatientData) {
    this.patientData = data;
    let content = `Patient is ${data.age} years old.`;
    if (data.name) {
      content += ` Patient's name is ${data.name}.`;
    }
    this.messages.push({
      actor: ThreadActor.System,
      content: content,
    });
  }

  private init() {
    this.messages = [
      {
        actor: ThreadActor.System,
        content: `You are a healthcare assistant. 
          You art providing information to a breast cancer patient.
          You need to know the patient's name and age to assist them better.
          You can work with only the age if the patient prefers to remain anonymous.
          You absolutely must have the age and will not answer any questions without know it.`,
      },
      {
        actor: ThreadActor.System,
        content: `You know the following on breast cancer and use only this information to respond to patient questions: 
        In 2022, there were 2.3 million women diagnosed with breast cancer and 670000 deaths globally. Breast cancer occurs 
        in every country of the world in women at any age after puberty but with increasing rates in later life. Global 
        estimates reveal striking inequities in the breast cancer burden according to human development. For instance, 
        in countries with a very high Human Development Index (HDI), 1 in 12 women will be diagnosed with breast cancer 
        in their lifetime and 1 in 71 women die of it. In contrast, in countries with a low HDI; while only 1 in 27 women 
        is diagnosed with breast cancer in their lifetime, 1 in 48 women will die from it.`,
      },
      {
        actor: ThreadActor.Assistant,
        content:
          "Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?",
      },
    ];
  }
}
