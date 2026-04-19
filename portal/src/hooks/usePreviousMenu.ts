import { Menu } from '@/types/gameConsole';
import useGameStore from '@/stores/screenStore';
import { useEffect } from 'react';
import { BackKeys } from '@/types/keys';

export default function usePreviousMenu(menu: Menu) {
  const { updateMenu } = useGameStore();
  function arrowHandler(event: KeyboardEvent) {
    if (BackKeys.includes(event.key)) {
      updateMenu(menu);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });
}
