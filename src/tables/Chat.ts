import { DEFAULT } from './Default';

export const CHAT = {
  name: 'chat',
  columns: {
    text: 'text',
    user: 'user',
    ...DEFAULT.timestamps,
  },
};
