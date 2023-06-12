import { LoginValues } from '../domains/login';

import jwt from 'jsonwebtoken';

export function validateToken() {
  const user = JSON.parse(window.localStorage.getItem('user') ?? '{}') as LoginValues;
  if (!user || !user.token) return false;

  return jwt.verify(user.token.split(' ')[1], '9ff745de-7457-4084-90c9-8cd21ac42116', error => {
    return error ? false : true;
  });
}
