import { LoginValues } from '../domain/login';

import jwt from 'jsonwebtoken';

export function validateToken() {
  const user = JSON.parse(window.localStorage.getItem('user') ?? '{}') as LoginValues;

  if (!user || !user.token) return false;

  return jwt.verify(user.token.split(' ')[1], 'levva-coins-secret', error => {
    return error ? false : true;
  });
}
