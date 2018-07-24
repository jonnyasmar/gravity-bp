import { createSelector } from 'reselect';
import { IReducers, IProps, ISelectors } from 'reducers';
import { IMessage } from 'models/Message';

export namespace Chat {
  type Selectors = {
    getMessages: Array<IMessage>;
  };
  export type Props = IProps<Selectors>;

  const rawMessages = (state: IReducers) => state.Chat.data.items;

  const messages = createSelector([rawMessages], messages => {
    try {
      return messages.map((message: IMessage) => message as IMessage);
    } catch (e) {
      return [];
    }
  });

  export const selectors: ISelectors = (state: IReducers): Selectors => ({
    getMessages: messages(state),
  });
}
