import { zodResponseFormat } from 'openai/helpers/zod';
import { never, unknown, z } from 'zod';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { PatientData, ThreadActor, ThreadMessage } from './entities.js';

/**
 * OpenAI client wrapper to encapsulate OpenAI APIs for Health Assistant.
 */
export class HealthAssistantClient {
  private readonly outStream: NodeJS.WriteStream;

  /** The AI model to use */
  private readonly model: string;

  /** OpenAI client to interact with */
  private readonly openAI: OpenAI;

  /** Used to strongly typed parse user answer for getting their name and age */
  private PatientDataResponse = z.object({
    assistant_response: z.string(),
    is_patient_give_info: z.boolean(),
    patient_name: z.string(),
    patient_age: z.number(),
  });

  constructor(outStream: NodeJS.WriteStream, apiKey: string, model: string = 'gpt-4o-mini') {
    this.outStream = outStream;
    this.model = model;
    this.openAI = new OpenAI({ apiKey: apiKey });
  }

  /**
   * Use structured outputs to understand if user responded with required
   * name/age info. and to extract it.
   * No proper error handling for now.
   */
  public async getPatientData(
    messages: ThreadMessage[],
  ): Promise<[ThreadMessage | undefined, PatientData | undefined]> {
    const params = {
      model: this.model,
      messages: this.convertMessagesToParams(messages),
      response_format: zodResponseFormat(this.PatientDataResponse, 'data'),
    };

    const completion = await this.openAI.beta.chat.completions.parse(params);
    const response = completion.choices[0]?.message;
    if (response?.parsed) {
      let patientData;
      if (response.parsed.is_patient_give_info) {
        patientData = { name: response.parsed.patient_name, age: response.parsed.patient_age };
      }
      return [
        {
          actor: ThreadActor.Assistant,
          content: response.parsed.assistant_response,
        },
        patientData,
      ];
    } else if (response?.content) {
      return [
        {
          actor: ThreadActor.Assistant,
          content: response.content,
        },
        undefined,
      ];
    } else {
      return [undefined, undefined];
    }
  }

  /**
   * Simple question-answer loop using stream for the "typing" experience.
   * No proper error handling for now.
   */
  public async respondToQueryStream(messages: ThreadMessage[]): Promise<ThreadMessage | undefined> {
    const params = {
      model: this.model,
      messages: this.convertMessagesToParams(messages),
    };

    const stream = await this.openAI.beta.chat.completions.stream(params);

    // stream the output
    for await (const chunk of stream) {
      this.outStream.write(chunk.choices[0]?.delta?.content ?? '');
    }

    const content = await stream.finalContent();

    return content ? { actor: ThreadActor.Assistant, content } : undefined;
  }

  private convertMessagesToParams(messages: ThreadMessage[]): ChatCompletionMessageParam[] {
    return messages.map((message) => ({
      role: message.actor,
      content: [
        {
          type: 'text',
          text: message.content,
        },
      ],
    }));
  }
}
