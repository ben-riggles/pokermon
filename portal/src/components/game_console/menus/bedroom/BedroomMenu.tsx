import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';

export default function BedroomMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return <MenuPage title='Bedroom' onBack={handleBack}></MenuPage>;
}
