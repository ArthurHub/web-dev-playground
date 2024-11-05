import { PatientData, ThreadActor, ThreadMessage } from './entities.js';
import { HealthAssistantClient } from './health-assistant-client.js';

export class HealthAssistantThread {
  /** OpenAI client to interact with */
  private readonly client: HealthAssistantClient;

  /** All previous messages in the thread */
  private messages: ThreadMessage[] = [];

  /** Use name and age as collected from interaction */
  private patientData?: PatientData;

  constructor() {
    this.client = new HealthAssistantClient('your-api-key');
  }

  public async run() {
    // Clear and init messages in the thread for conversation
    this.init();

    // step 1: get patient data
    console.log(`${this.messages.at(-1)?.content}\n`);

    let attempts = 3;
    while (!this.patientData && attempts-- > 0) {
      this.getUserMessage();
      const [message, data] = await this.client.getPatientData(this.messages);
      if (message) {
        this.messages.push(message);
        console.log(`${message.content}\n`);
      }
      if (data) {
        this.patientData = data;
      }
    }

    // step 2: question-answer loop
    // for (let i = 0; i < 3; i++) {
    //   const text = this.getUserMessage();
    //   this.client.respondToQueryStream(this.messages);
    // }

    // step 3: goodbye message
  }

  private getUserMessage(): void {
    const text = "Hi, my name is Jane and I'm 45 years old.";
    // const text = "Hi, why do you need it? I'm just looking for some information.";
    this.messages.push({ actor: ThreadActor.User, content: text });
  }

  private init() {
    this.messages = [
      {
        actor: ThreadActor.System,
        content:
          'You are a healthcare assistant. You art providing information to a breast cancer patient.',
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
