export class Messages{
  static lastMessageId: number;

  public static messages: ReadonlyArray<string> = [
    'Welcome!',
    'Welcome to Gravity Boilerplate!',
    'Thanks for stopping by!',
    'Because React/Redux...',
    'Because TypeScript...',
    'Because Webpack...',
    'Because Express...'
  ];

  public static getNewMessage(): string{
    let messageId: number = this.lastMessageId;
    do{
      messageId = Math.round(Math.random() * (this.messages.length - 1));
    }while(messageId === this.lastMessageId);
    this.lastMessageId = messageId;
    return this.messages[messageId];
  };
}