import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function CashGamesScreen() {
  const { updateScreen } = useScreenStore();
  usePreviousScreen('Menu');

  return (
    <div>
      <div>Cash Games</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Menu')}>
        Back
      </div>
    </div>
  );
}
