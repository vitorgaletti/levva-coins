import { createStore } from 'effector';
import { NewAccountState } from './NewAccountState';
import {
  loadNewAccount,
  loadNewAccountDone,
  loadNewAccountFail,
} from '../NewAccountStore/NewAccountEvents';

const initialState: NewAccountState = {
  isLoading: false,
  hasError: false,
  errorMessage: '',
};

const NewAccountStore = createStore<NewAccountState>(initialState)
  .on(loadNewAccount, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadNewAccountDone, () => ({
    isLoading: false,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadNewAccountFail, (_, data) => ({
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default NewAccountStore;
