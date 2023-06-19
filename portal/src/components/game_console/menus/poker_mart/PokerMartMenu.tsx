import useScreenStore from '@/stores/screenStore';
import MenuLink from '../../lib/MenuLink';

export default function PokerMartMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Poker Mart</div>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </div>
  );
}
