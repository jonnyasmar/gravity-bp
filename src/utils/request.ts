import axios from 'axios';

export const request = async (route: string = '', options: any = {}): Promise<any> => {
  return axios(`${process.env.API}/${route}`, options)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
