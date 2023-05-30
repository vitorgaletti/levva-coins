import { createStore } from 'effector';
import { LoginState } from './LoginState';
import { loadLogin, loadLoginDone, loadLoginFail } from './LoginEvents';

const initialState: LoginState = {
  isLoading: false,
  hasError: false,
  errorMessage: '',
};

const LoginStore = createStore<LoginState>(initialState)
  .on(loadLogin, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadLoginDone, state => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadLoginFail, (_, data) => ({
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default LoginStore;
