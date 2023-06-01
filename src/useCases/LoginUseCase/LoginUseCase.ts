import { router } from '../../Router';
import { LoginParams, LoginValues } from '../../domains/login';
import { RequestError } from '../../domains/request';
import { LoginService } from '../../services/LoginService/LoginService';
import { loadLogin, loadLoginDone, loadLoginFail } from '../../stores/LoginStore/LoginEvents';

const execute = async ({ email, password }: LoginParams): Promise<void> => {
  loadLogin();

  return LoginService.authenticateUser({ email, password })
    .then((user: LoginValues) => {
      window.localStorage.setItem('user', JSON.stringify(user));

      loadLoginDone();

      router.navigate('/home');
    })
    .catch(({ hasError, message }: RequestError) => {
      loadLoginFail({ hasError, message });
    });
};

const LoginUseCase = {
  execute,
};

export default LoginUseCase;
