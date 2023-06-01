import { HeaderContainer, HeaderContent } from './styles';

import levvaCoinsLogo from '../../assets/logo.svg';

import { CategoryModal } from './CategoryModal';
import { MyProfileModal } from './MyProfileModal';
import { TransactionModal } from './TransactionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <CategoryModal />

          <TransactionModal />
        </div>

        <MyProfileModal />
      </HeaderContent>
    </HeaderContainer>
  );
}
