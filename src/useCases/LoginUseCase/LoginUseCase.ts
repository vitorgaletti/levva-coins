import { LoginParams, LoginValues } from '../../domain/login';
import { RequestError } from '../../domain/request';
import { LoginService } from '../../services/LoginService/LoginService';

const execute = async ({ email, password }: LoginParams): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {};

  return LoginService.authenticateUser({ email, password }).then((user: LoginValues) => {
    window.localStorage.setItem('token', JSON.stringify(user));
  });
};

const LoginUseCase = {
  execute,
};

export default LoginUseCase;
