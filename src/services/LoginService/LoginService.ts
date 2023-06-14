import Api from '../../clients/api/Api';
import { LoginParams, LoginValues } from '../../domains/login';

import { AxiosError } from 'axios';
import { RequestError } from '../../domains/request';

const authenticateUser = async ({ email, password }: LoginParams): Promise<LoginValues> => {
  return Api.post({
    url: '/auth',
    body: {
      email,
      password,
    },
  })
    .then(response => {
      return response.data.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const LoginService = {
  authenticateUser,
};
