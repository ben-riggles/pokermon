import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';

export default function DojoMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return <MenuPage title='Dojo' onBack={handleBack}></MenuPage>;
}
