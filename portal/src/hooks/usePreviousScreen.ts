import { Screen } from '@/types/gameConsole';
import useGameStore from '@/stores/screenStore';
import { useEffect } from 'react';
import { BackKeys } from '@/types/keys';

export default function usePreviousScreen(screen: Screen) {
  const { updateScreen } = useGameStore();
  function arrowHandler(event: KeyboardEvent) {
    if (BackKeys.includes(event.key)) {
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
