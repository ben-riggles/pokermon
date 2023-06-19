import useScreenStore from '@/stores/screenStore';
import MenuLink from '../../lib/MenuLink';

export default function BedroomInput() {
  const { updateMenu } = useScreenStore();

  function handleBack() {
    updateMenu('Bedroom Menu');
  }

  return (
    <div>
      <div>Input Your Info</div>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </div>
  );
}
