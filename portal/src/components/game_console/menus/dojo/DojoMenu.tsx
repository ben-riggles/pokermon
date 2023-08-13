import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';
import MenuLink from '../../lib/MenuLink';

export default function DojoMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <MenuPage title='Dojo' onBack={handleBack}>
      <MenuList>
        <MenuLink onClick={() => updateMenu('Tournaments')}>
          All Tournaments
        </MenuLink>
        <MenuLink onClick={() => updateMenu('Submit Placements')}>
          Submit Placements
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
