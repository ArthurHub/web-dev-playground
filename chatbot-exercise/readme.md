# Chatbot Exercise

## Requirements

Build an AI agent with a python state machine that completes the following routine:

1. Ask the user for his/her name
2. Ask the user for his/her age
3. Answer 3 user questions from the knowledge-base below
4. Wish the user a nice day and end the interaction

## Solution

- Using OpenAI APIs for LLM [text generation](https://platform.openai.com/docs/guides/text-generation) capabilities to interact with the user.
- Use [System messages](https://platform.openai.com/docs/guides/text-generation#system-messages) to control the bot behavior, requirements, and flow.
  - Used to direct the bot to ask for user name and age. Encourage providing the info. Allowing for anonymity but not allowing to proceed without providing age.
  - Limit the responses to the provided "knowledge-base".
- Used [Structured outputs](https://platform.openai.com/docs/guides/structured-outputs) to simplify extraction of user name and/or age from the input.

### Code Structure

**HealthAssistantThread**

- Encapsulate a single conversation with the user.
- Holds all the messages to keep the context for the next user question.
- Hold the knowledge base and behavioral system messages.
- Has the simple logic (no state machine) of conversation flow.

**HealthAssistantClient**

- OpenAI client wrapper to encapsulate OpenAI APIs.
- No state of the conversation.

## Setup

Requirements:

- Node.js
- npm
- OpenAI API key

```bash
npm install
export OPENAI_API_KEY="your_api_key_here"
npm run start
```

## Examples

Simple:

```
> Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?

> Hi, my name is Jane and I'm 45 years old.
```

Not giving name:

```
Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?

> why?

I need your name and age to provide personalized information and support regarding breast cancer.
If you prefer to remain anonymous, I can still assist you with your age. It's important for me to
know your age because breast cancer can present differently at various stages of life, and more tailored
advice can be given based on that information. Your comfort is important, so please let me know how you
would like to proceed!

> ok... 52

Thank you for sharing your age. At 52, it's important to be aware of breast cancer screening and the
risks involved. Regardless of the specific concerns you may have, it’s essential to keep up with
regular mammogram screenings and self-examinations. If you have any specific questions or topics
you’d like to discuss regarding breast cancer, please feel free to ask!

> how many die from it

Globally, the statistics indicate that in 2022, there were approximately 670,000 deaths from breast
cancer. The likelihood of dying from breast cancer can vary depending on several factors, including
the country’s human development index. In countries with a very high Human Development Index, ab> what
are my chances?

At 52 years old, your chances of being diagnosed with breast cancer increase, as it typically occurs
more commonly in older age groups. In countries with a very high Human Development Index, 1 in 12 women
will be diagnosed with breast cancer in their lifetime. It's important to remember that individual risk
factors, such as family history, genetics, lifestyle, and overall health, can significantly influence
your personal risk.

> is it better to be in hdi country?

Yes, being in a country with a very high Human Development Index (HDI) can have an impact on breast
cancer outcomes. In such countries, the diagnosis and treatment options tend to be more advanced,
leading to better screening, early detection, and more effective treatments, which can improve survival rates.

For instance, in countries with a very high HDI, the likelihood of being diagnosed with breast cancer
is 1 in 12, but the death rate from it is lower, with about 1 in 71 women dying from the disease. In
contrast, in countries with low HDI, while a somewhat higher rate of diagnosis (1 in 27 women) exists,
the mortality rate is higher at about 1 in 48 women.

Access to quality healthcare, education, and support services are key factors that can lead to better
outcomes. If you have further questions regarding this or other aspects, feel free to ask!

This is all the questions I can answer at this time. Thank you.
```

Just no:

```
Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?

> no

I understand your preference for privacy. However, I will need to know your age to assist you better.
Can you please provide your age?

> no

I respect your decision not to share your information. Unfortunately, I cannot provide any further
assistance without knowing your age. If you change your mind, feel free to let me know.

> nope

I respect your choice to remain private, but without knowing your age, I am unable to provide
assistance. If you wish to share your age at any point, I'm here to help.
```
