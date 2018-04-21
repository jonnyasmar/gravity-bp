import * as TYPES from 'utils/types';

export interface IActions {
  readonly setMessage: (message: string) => any;
}

export const actions = (dispatch: any, store: any): IActions => ({
  setMessage: async (message: string): Promise<any> => {
    return dispatch({
      type: TYPES.App.NEW_MESSAGE,
      message,
    });
  },
});
