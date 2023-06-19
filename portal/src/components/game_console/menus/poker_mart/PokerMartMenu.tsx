import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';

export default function PokerMartMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return <MenuPage title='Poker Mart' onBack={handleBack}></MenuPage>;
}
