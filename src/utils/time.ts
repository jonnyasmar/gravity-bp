import * as moment from 'moment';

export const getCurrentUTC = () =>
  moment
    .utc()
    .toDate()
    .toUTCString();
