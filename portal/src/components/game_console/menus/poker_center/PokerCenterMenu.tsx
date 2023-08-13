import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';
import MenuLink from '../../lib/MenuLink';

export default function PokerCenterMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <MenuPage title='Poker Center' onBack={handleBack}>
      <MenuList>
        <MenuLink onClick={() => updateMenu('Leaderboards')}>
          Leaderboards
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
