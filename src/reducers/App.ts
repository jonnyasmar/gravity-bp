import * as services from '../services';

export interface IState{
  readonly message?: string
}

export interface IAction extends IState{
  readonly type: string
}

export const types = {
  NEW_MESSAGE: 'NEW_MESSAGE'
};

export const STATE: IState = {
  message: services.Messages.getNewMessage()
};

export const reducers = (state: IState = STATE, action: IAction): IState =>{
  switch(action.type){
    case types.NEW_MESSAGE:
      return {
        ...state,
        message: action.message
      };

    default:
      return state
  }
};