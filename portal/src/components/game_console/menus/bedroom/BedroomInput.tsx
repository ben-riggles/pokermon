import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';

export default function BedroomInput() {
  const { updateMenu } = useScreenStore();

  function handleBack() {
    updateMenu('Bedroom Menu');
  }

  return <MenuPage title='Input Your Info' onBack={handleBack}></MenuPage>;
}
