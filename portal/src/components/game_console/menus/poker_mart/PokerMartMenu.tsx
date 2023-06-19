import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function PokerMartMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Poker Mart</div>
      <div className='cursor-pointer' onClick={handleBack}>
        Back
      </div>
    </div>
  );
}
