import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';

export default function Tournaments() {
  const { updateMenu } = useScreenStore();

  function handleBack() {
    updateMenu('Dojo Menu');
  }

  return <MenuPage title='Tournaments' onBack={handleBack}></MenuPage>;
}
