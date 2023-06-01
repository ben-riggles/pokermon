import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';
import { useEffect } from 'react';

export default function TournamentsScreen() {
  usePreviousScreen('Menu');
  const { updateScreen } = useScreenStore();
  function arrowHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      updateScreen('Menu');
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
      <div>Tournaments</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Menu')}>
        Back
      </div>
    </div>
  );
}
