import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import MenuList from '@/components/game_console/lib/MenuList';
import MenuLink from '@/components/game_console/lib/MenuLink';

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
