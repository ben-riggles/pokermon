import useScreenStore from '@/stores/gameStore';
import { SCREEN } from '@/types/gameConsole';
import { useEffect } from 'react';

export default function GraphsScreen() {
  const { updateIndex } = useScreenStore();
  function arrowHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      updateIndex(SCREEN.Menu);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });
  return (
    <div>
      <div>Graphs</div>
      <div className='cursor-pointer' onClick={() => updateIndex(SCREEN.Menu)}>
        Back
      </div>
    </div>
  );
}
