import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function GraphsScreen() {
  const { updateScreen } = useScreenStore();
  usePreviousScreen('Menu');
  return (
    <div>
      <div>Graphs</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Menu')}>
        Back
      </div>
    </div>
  );
}
