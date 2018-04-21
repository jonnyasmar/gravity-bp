interface IEventSources {
  [key: string]: EventSource;
}

interface ISubscribeResponse {
  event: EventSource;
  channel: string;
}

export interface IEventSource {
  onerror?: (evt: MessageEvent) => any;
  onmessage?: (evt: MessageEvent) => any;
  onopen?: (evt: MessageEvent) => any;
}

export class Events {
  static storage: IEventSources = {};

  static unload: void = window.addEventListener('unload', () => {
    Events.unsubscribeAll();
  });

  static subscribe = (channel: string, options: IEventSource): ISubscribeResponse => {
    try {
      if (Events.storage[channel]) throw new Error(`Already subscribed to ${channel}...`);

      let subscribeUrl = (process.env.SUBSCRIBE_URL || '').replace(':channel', channel);

      let eventSource: EventSource = new EventSource(subscribeUrl);
      eventSource.onerror = options.onerror || (evt => console.error(evt));
      eventSource.onmessage = options.onmessage || (evt => console.dir(evt));
      eventSource.onopen =
        options.onopen ||
        (() => {
          console.log(`Subscribed to ${channel}...`);
        });

      Events.storage[channel] = eventSource;

      return {
        event: Events.storage[channel],
        channel,
      };
    } catch (err) {
      throw err;
    }
  };

  static unsubscribe = (channel: string): string => {
    try {
      if (!Events.storage[channel]) throw new Error(`Not subscribed to ${channel}...`);
      Events.storage[channel].close();
      delete Events.storage[channel];
      console.log(`Unsubscribed from ${channel}...`);

      return channel;
    } catch (err) {
      throw err;
    }
  };

  static unsubscribeAll = (): void => {
    Object.keys(Events.storage).forEach(channel => {
      try {
        Events.storage[channel].close();
        delete Events.storage[channel];
        console.log(`Unsubscribed from ${channel}...`);
      } catch (err) {
        throw err;
      }
    });
  };
}
