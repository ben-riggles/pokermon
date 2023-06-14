import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function PokerCenterScreen() {
  const { updateScreen } = useScreenStore();
  usePreviousScreen('Menu');
  return (
    <div>
      <div>Poker Center</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Menu')}>
        Back
      </div>
    </div>
  );
}
