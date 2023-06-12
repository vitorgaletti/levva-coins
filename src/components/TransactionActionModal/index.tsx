import { useStore } from 'effector-react/compat';
import { TrashSimple } from 'phosphor-react';
import { useRef } from 'react';
import TransactionStore from '../../stores/TransactionStore/TransactionStore';
import { FormError } from '../../styles/global';
import RemoveTransactionUseCase from '../../useCases/RemoveTransactionUseCase/RemoveTransactionUseCase';
import { Modal } from '../Modal';
import {
  DeleteTransactionButton,
  DeleteTransactionContainer,
  TransactionActionButton,
} from './styles';

interface TransactionActionModalProps {
  id: string;
}

export function TransactionActionModal({ id }: TransactionActionModalProps) {
  const { isLoading, errorMessage, hasError } = useStore(TransactionStore);
  const closeModalRef = useRef<HTMLButtonElement>(null);

  async function handleDeleteTransaction() {
    await RemoveTransactionUseCase.execute(id);
  }
  console.log(isLoading);
  return (
    <Modal
      title="Confirme a exclusão"
      trigger={
        <TransactionActionButton>
          <TrashSimple size={24} />
        </TransactionActionButton>
      }
      closeModalRef={closeModalRef}
    >
      <DeleteTransactionContainer>
        <p>Você realmente deseja excluir essa transação?</p>

        <div>
          <DeleteTransactionButton variant="cancel" onClick={() => closeModalRef.current?.click()}>
            Cancelar
          </DeleteTransactionButton>
          <DeleteTransactionButton
            variant="confirm"
            onClick={handleDeleteTransaction}
            disabled={isLoading}
          >
            Confirmar
          </DeleteTransactionButton>
        </div>
        {hasError && <FormError>{errorMessage}</FormError>}
      </DeleteTransactionContainer>
    </Modal>
  );
}
