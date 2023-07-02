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
        <MenuLink onClick={() => updateMenu('Tournament Placements')}>
          Players
        </MenuLink>
        <MenuLink onClick={() => updateMenu('Tournaments')}>
          Tournaments
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
