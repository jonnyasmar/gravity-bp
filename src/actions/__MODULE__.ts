import { types } from 'reducers';
import { Store, Dispatch, states, actions } from 'reducers';
import { IData } from 'reducers/__MODULE__';

export interface IActions {
  readonly action: (data: any) => actions.__MODULE__;
}

export const action = (dispatch: Dispatch<actions.__MODULE__>, store: Store<states.__MODULE__>): IActions => ({
  action: (data: Array<IData>): actions.__MODULE__ => {
    return dispatch({
      type: types.__MODULE__.ACTION,
      data,
    });
  },
});
