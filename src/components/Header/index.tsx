import { ReactNode } from 'react';

import {
  HeaderContainer,
  HeaderContent,
  NewCategoryButton,
  NewTransactionButton,
  SignOutButton,
  UserAvatar,
} from './styles';

import levvaCoinsLogo from '../../assets/logo.svg';
import { Modal } from '../Modal';
import {
  Form,
  FormButton,
  FormInput,
  TransactionTypeButton,
  TransactionTypeContainer,
} from '../../styles/global';
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react';
import { router } from '../../Router';

export function Header() {
  const newCategoryButton: ReactNode = <NewCategoryButton>Nova Categoria</NewCategoryButton>;
  const newTransactionButton: ReactNode = (
    <NewTransactionButton>Nova Transação</NewTransactionButton>
  );
  const userAvatar: ReactNode = <UserAvatar src="https://github.com/jemluz.png" alt="Jemima Luz" />;

  function handleSignOut() {
    window.localStorage.removeItem('user');
    router.navigate('/login');
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <Modal title="Nova categoria" trigger={newCategoryButton}>
            <Form>
              <FormInput type="name" placeholder="Descrição" />
              <FormButton type="submit">Cadastrar</FormButton>
            </Form>
          </Modal>
          <Modal title="Nova transação" trigger={newTransactionButton}>
            <Form>
              <FormInput type="text" placeholder="Descrição" required />
              <FormInput type="number" placeholder="Preço" required />
              <FormInput type="text" placeholder="Categoria" required />

              <TransactionTypeContainer>
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionTypeContainer>

              <FormButton type="submit">Cadastrar</FormButton>
            </Form>
          </Modal>
        </div>

        <Modal title="Meu perfil" trigger={userAvatar}>
          <Form>
            <UserAvatar src="https://github.com/jemluz.png" alt="Jemima Luz" variant="large" />

            <FormInput type="name" placeholder="Jemina Luz" />
            <FormInput type="email" placeholder="jemima.luz@levva.io" disabled />

            <FormButton type="submit">Atualizar</FormButton>
            <SignOutButton type="button" onClick={handleSignOut}>
              Sair
            </SignOutButton>
          </Form>
        </Modal>
      </HeaderContent>
    </HeaderContainer>
  );
}
