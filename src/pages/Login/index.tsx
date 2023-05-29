import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthLayout } from '../../layouts/AuthLayout';
import { Form, FormButton, FormError, FormInput } from '../../styles/global';

interface FormProps {
  email: string;
  password: string;
}

const formSchema = yup
  .object({
    email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
  })
  .required();

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
  });

  function handleLogin({ email, password }: FormProps) {
    console.log({ email, password });
  }

  return (
    <AuthLayout title="Login" subtitle="Gerenciar suas entradas e saídas nunca foi tão simples.">
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormInput {...register('email')} placeholder="E-mail" />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormInput {...register('password')} type="password" placeholder="Senha" />
        {errors.password && <FormError>{errors.password.message}</FormError>}
        <FormButton type="submit">Entrar</FormButton>
      </Form>
    </AuthLayout>
  );
}
