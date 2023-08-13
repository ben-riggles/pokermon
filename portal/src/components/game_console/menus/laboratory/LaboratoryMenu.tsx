import useScreenStore from '@/stores/screenStore';
import MenuLink from '@/components/game_console/lib/MenuLink';
import MenuList from '@/components/game_console/lib/MenuList';
import MenuPage from '@/components/game_console/lib/MenuPage';

export default function LaboratoryMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <MenuPage title='Laboratory' onBack={handleBack}>
      <MenuList>
        <MenuLink onClick={() => updateMenu('All Players')}>Players</MenuLink>
      </MenuList>
    </MenuPage>
  );
}
