import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react';
import * as yup from 'yup';
import {
  Form,
  FormButton,
  FormError,
  FormInput,
  FormSelect,
  TransactionTypeButton,
  TransactionTypeContainer,
} from '../../styles/global';
import { Modal } from '../Modal';
import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react/effector-react.mjs';
import CategoryStore from '../../stores/CategoryStore/CategoryStore';
import TransactionStore from '../../stores/TransactionStore/TransactionStore';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import GetCategoriesUseCase from '../../useCases/GetCategoriesUseCase/GetCategoriesUseCase';
import NewTransactionUseCases from '../../useCases/NewTransactionUseCase/NewTransactionUseCase';
import { NewTransactionButton } from './styles';
import { LoginValues } from '../../domains/login';
import { useGetTransactionData } from '../../hooks/useGetTransactionData';

interface FormProps {
  description: string;
  amount: number;
  type: string;
  categoryId: string;
  userEmail: string;
}

const formSchema = yup
  .object({
    description: yup.string().required('O nome da transação é obrigatória'),
    amount: yup
      .number()
      .typeError('O valor precisa de um número')
      .required('O valor da transação é obrigatória'),
    type: yup.string().oneOf(['income', 'outcome']).required('O tipo da transação é obrigatória'),
    categoryId: yup.string().required('A categoria da transação é obrigatória'),
  })
  .required();

export function TransactionModal() {
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const storageUser = JSON.parse(window.localStorage.getItem('user') ?? '{}') as LoginValues;

  const { categories } = useStore(CategoryStore);
  const { isLoading, hasError, errorMessage } = useStore(TransactionStore);

  const { getTransactions, handlePagination } = useGetTransactionData();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    GetCategoriesUseCase.execute();
  }, []);

  async function handleCreateTransaction({
    description,
    amount,
    type,
    categoryId,
    userEmail = storageUser.email,
  }: FormProps) {
    NewTransactionUseCases.execute({
      description,
      amount,
      type: type === 'income' ? 0 : 1,
      categoryId,
      userEmail,
    })
      .then(() => {
        getTransactions();
        handlePagination({ pageNumber: 1 });
        closeModalRef.current?.click();
      })
      .finally(() => {
        reset();
      });
  }

  return (
    <Modal
      title="Nova transação"
      closeModalRef={closeModalRef}
      trigger={<NewTransactionButton>Nova transação</NewTransactionButton>}
    >
      <Form onSubmit={handleSubmit(handleCreateTransaction)}>
        <FormInput {...register('description')} placeholder="Descrição" />
        {errors.description && <FormError>{errors.description.message}</FormError>}

        <FormInput
          {...register('amount')}
          type="number"
          placeholder="Preço"
          step="0.1"
          min="0"
          max="999999"
        />
        {errors.amount && <FormError>{errors.amount.message}</FormError>}

        <FormSelect {...register('categoryId')} defaultValue="">
          <option value="" disabled hidden>
            Categoria
          </option>
          {categories.map(category => (
            <option value={category.id} key={category.id}>
              {category.description}
            </option>
          ))}
        </FormSelect>
        {errors.categoryId && <FormError>{errors.categoryId.message}</FormError>}

        <TransactionTypeContainer
          {...register('type')}
          onChange={event => setValue('type', (event.target as HTMLButtonElement).value)}
        >
          <TransactionTypeButton variant="income" value="income">
            <ArrowCircleUp size={24} />
            Entrada
          </TransactionTypeButton>

          <TransactionTypeButton variant="outcome" value="outcome">
            <ArrowCircleDown size={24} />
            Saída
          </TransactionTypeButton>
        </TransactionTypeContainer>
        {errors.type && <FormError>{errors.type.message}</FormError>}

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormButton type="submit">{isLoading ? 'Carregando...' : 'Cadastrar'}</FormButton>
      </Form>
    </Modal>
  );
}
