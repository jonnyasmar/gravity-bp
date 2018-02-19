import axios from 'axios';

export const request = async (url: string = '', options: any = {}): Promise<any> =>{
  return axios(url, options).then(response => response.data).catch(err =>{
    throw err;
  });
};

export const url = (route: string): string =>{
  return `${process.env.API}/${route}`;
};