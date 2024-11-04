import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import OpenAI from 'openai';
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming,
  ChatCompletionMessageParam,
} from 'openai/resources/index.mjs';

export class HealthAssistant {
  private readonly model: string;
  private readonly openAI: OpenAI;
  private patientData?: {
    name: string;
    age: number;
  };

  private PatientDataResponse = z.object({
    assistant_response: z.string(),
    is_patient_give_info: z.boolean(),
    patient_name: z.string(),
    patient_age: z.number(),
  });

  constructor(model: string = 'gpt-4o-mini') {
    this.model = model;
    this.openAI = new OpenAI();
  }

  public async getPatientData(): Promise<void> {
    const params = this.createPatientDataMessageParams([
      {
        role: 'user',
        content: [
          {
            type: 'text',
            // text: "Hi, my name is Jane and I'm 45 years old.",
            // text: "Hi, my name is Jane and I'm 80, I live in seattle and my favorite food is cake.",
            text: "Hi, why do you need it? I'm just looking for some information.",
          },
        ],
      },
    ]);

    const completion = await this.openAI.beta.chat.completions.parse(params);
    const response = completion.choices[0]?.message;
    if (response?.parsed) {
      const name = response.parsed['name'];
      const age = response.parsed['age'];
      if (name && age) {
        console.log(`Got patient name: "${name}", and age: "${age}"`);
      } else {
        console.log('Failed to get patient name and age');
      }
    } else {
      console.log('no parsed response');
    }

    // for await (const chunk of stream) {
    //   process.stdout.write(chunk.choices[0]?.delta?.content ?? '');
    // }
  }

  private createPatientDataMessageParams(
    messages: ChatCompletionMessageParam[],
  ): ChatCompletionCreateParamsNonStreaming {
    return {
      model: this.model,
      messages: [
        {
          role: 'system',
          content:
            'You are a healthcare assistant. You art providing information to a breast cancer patient.',
        },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: "Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?",
            },
          ],
        },
        ...messages,
      ],
      response_format: zodResponseFormat(this.PatientDataResponse, 'data'),
    };
  }
}
