/** Entity for use data required for the flow */
export interface PatientData {
  name: string;
  age: number;
}

/** Single message in a thread */
export interface ThreadMessage {
  actor: ThreadActor;
  content: string;
}

export enum ThreadActor {
  /** Context info for AI assistant */
  System = 'system',
  /** The human patient */
  User = 'user',
  /** AI assistant */
  Assistant = 'assistant',
}
