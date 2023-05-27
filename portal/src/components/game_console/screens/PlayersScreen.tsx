import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function PlayersScreen() {
  usePreviousScreen('Menu');
  const { updateScreen } = useScreenStore();

  return (
    <div>
      <div>Players</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Menu')}>
        Back
      </div>
    </div>
  );
}
