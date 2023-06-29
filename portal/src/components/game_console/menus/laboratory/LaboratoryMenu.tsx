import useScreenStore from '@/stores/screenStore';
import MenuLink from '../../lib/MenuLink';
import MenuList from '../../lib/MenuList';
import MenuPage from '../../lib/MenuPage';

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
        <MenuLink onClick={() => updateMenu('Leaderboards')}>
          Leaderboards
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
