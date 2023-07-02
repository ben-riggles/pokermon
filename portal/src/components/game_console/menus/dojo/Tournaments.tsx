import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';

export default function Tournaments() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Dojo');
    updateMenu('Dojo Menu');
  }

  return <MenuPage title='Tournaments' onBack={handleBack}></MenuPage>;
}
