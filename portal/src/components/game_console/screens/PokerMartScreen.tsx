import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function PokerMartScreen() {
  const { updateScreen } = useScreenStore();

  return (
    <div>
      <div>Poker Mart</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Welcome')}>
        Back
      </div>
    </div>
  );
}
