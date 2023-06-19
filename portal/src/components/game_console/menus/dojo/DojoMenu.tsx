import useScreenStore from '@/stores/screenStore';
import MenuLink from '../../lib/MenuLink';

export default function DojoMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Dojo</div>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </div>
  );
}
