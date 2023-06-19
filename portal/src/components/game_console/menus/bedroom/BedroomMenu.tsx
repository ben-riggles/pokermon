import useScreenStore from '@/stores/screenStore';
import MenuLink from '../../lib/MenuLink';

export default function BedroomMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Bedroom</div>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </div>
  );
}
