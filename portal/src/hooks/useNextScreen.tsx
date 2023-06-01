import { Screen } from '@/types/gameConsole';
import useGameStore from '@/stores/screenStore';
import { useEffect } from 'react';
import { ForwardKeys } from '@/types/keys';

export default function useNextScreen(screen: Screen) {
  const { updateScreen } = useGameStore();
  function arrowHandler(event: KeyboardEvent) {
    if (ForwardKeys.includes(event.key)) {
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
