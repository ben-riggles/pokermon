import { Screen } from '@/types/gameConsole';
import useGameStore from '@/stores/screenStore';
import { useEffect } from 'react';

export default function usePreviousScreen(screen: Screen) {
  const { updateScreen } = useGameStore();
  function arrowHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      updateScreen(screen);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });
}
