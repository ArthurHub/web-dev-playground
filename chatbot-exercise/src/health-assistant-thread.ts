import { PatientData, ThreadActor, ThreadMessage } from './entities.js';
import { HealthAssistantClient } from './health-assistant-client.js';
import * as readline from 'readline/promises';

/**
 * Encapsulate a single conversation with the user.
 * Holds all the messages to keep the context for the next user question.
 * Hold the knowledge base and behavioral system messages.
 * Has the simple logic (no state machine) of conversation flow.
 */
export class HealthAssistantThread {
  /** OpenAI client to interact with */
  private readonly client: HealthAssistantClient;

  /** All previous messages in the thread */
  private messages: ThreadMessage[] = [];

  /** Use name and age as collected from interaction */
  private patientData: PatientData | undefined;

  constructor() {
    const apiKey = process.env['OPENAI_API_KEY'];
    if (!apiKey) {
      throw new Error(
        `Please set OPENAI_API_KEY environment variable.
export OPENAI_API_KEY="your_api_key_here"`,
      );
    }

    this.client = new HealthAssistantClient(process.stdout, apiKey);
  }

  public async run(): Promise<void> {
    // Clear and init messages in the thread for conversation
    this.init();

    // step 1: get patient data
    await this.getPatientAgeStep();
    if (!this.patientData) {
      return;
    }

    // step 2: question-answer loop
    await this.questionAnswersStep();

    // step 3: goodbye message
    console.log('\n\nThis is all the questions I can answer at this time. Thank you.\n');
  }

  /**
   * Ask the user for name and age.
   * Allow 3 iterations to get the info from the user.
   * If the user provides the info it is set on the thread state.
   */
  private async getPatientAgeStep(): Promise<void> {
    const question =
      "Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?";
    console.log(`${question}\n`);
    this.messages.push({ actor: ThreadActor.Assistant, content: question });

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
  }

  /**
   * Get user question and provide an answer simple loop limited to 3.
   * TODO: check user sentiment to break early on "goodbye" user input.
   */
  private async questionAnswersStep(): Promise<void> {
    for (let i = 0; i < 3; i++) {
      await this.getInputFromUser();
      const message = await this.client.respondToQueryStream(this.messages);
      if (message) {
        this.messages.push(message);
      }
    }
  }

  private async getInputFromUser(): Promise<void> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
      let answer;
      while (!answer) {
        answer = (await rl.question('> ')).trim();
      }
      this.messages.push({ actor: ThreadActor.User, content: answer });
      console.log();
    } finally {
      rl.close();
    }
  }

  private setPatientData(data: PatientData): void {
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

  /**
   * Clear the state of the thread and initialize with base system messages.
   * System messages define the behavior and knowledge of the bot.
   */
  private init(): void {
    this.patientData = undefined;
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
    ];
  }
}
