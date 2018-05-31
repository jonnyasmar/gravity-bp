import * as React from 'react';
import { createSelector } from 'reselect';
import { RealisticTyper } from 'react-realistic-typer';
import { IReducers, IProps, ISelectors } from 'reducers';
import { IMessage } from 'reducers/Chat';

export namespace Chat {
  type Selectors = {
    getMessages: Array<JSX.Element>;
  };
  export type Props = IProps<Selectors>;

  export const selectors: ISelectors = (state: IReducers): Selectors => ({
    getMessages: messages(state),
  });

  const rawMessages = (state: IReducers) => state.Chat.messages;

  const messages = createSelector([rawMessages], messages =>
    messages.map((message: IMessage, i: number) => (
      <span key={i}>
        <strong>{message.user || 'GBP'}:</strong>{' '}
        <RealisticTyper message={message.text || ''} wpm={600} maxPause={125} />
      </span>
    ))
  );
}
