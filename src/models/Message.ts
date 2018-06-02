import { IID, IUpdated, ITimestamps } from './General';

export interface IMessageBody {
  text: string;
  user: string;
}

export interface IMessageCreate extends IMessageBody {}
export interface IMessageCreateAPI extends Readonly<IMessageBody>, Readonly<ITimestamps> {}

export interface IMessageUpdate extends IID, IMessageBody {}
export interface IMessageUpdateAPI extends Readonly<IID>, Readonly<IMessageBody>, Readonly<IUpdated> {}

export interface IMessageDelete extends IID {}

export type IMessageActions = IMessage | IMessageCreate | IMessageUpdate | IMessageDelete;

export interface IMessage extends IID, IMessageBody, ITimestamps {}
