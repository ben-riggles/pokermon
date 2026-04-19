import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import MenuList from '../../lib/MenuList';
import MenuLink from '../../lib/MenuLink';

export default function PokerMartMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <MenuPage title='Poker Mart' onBack={handleBack}>
      <MenuList>
        <MenuLink onClick={() => updateMenu('Payouts')}>Payouts</MenuLink>
      </MenuList>
    </MenuPage>
  );
}
