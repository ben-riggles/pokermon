import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import useScreenStore from '@/stores/screenStore';
import { Screen } from '@/types/gameConsole';
import { DownKeys, ForwardKeys, UpKeys } from '@/types/keys';
// import usePreviousScreen from '@/hooks/usePreviousScreen';

const menuItems: { label: string; screen: Screen }[] = [
  // { label: 'Players', screen: 'Players' },
  // { label: 'Tournaments', screen: 'Tournaments' },
  // { label: 'CashGames', screen: 'CashGames' },
  // { label: 'Graphs', screen: 'Graphs' },
  // { label: 'Exit', screen: 'Welcome' },
];

export default function MenuScreen() {
  const [cursorLoc, setCursor] = useState(0);
  const { updateScreen } = useScreenStore();

  function arrowHandler(event: KeyboardEvent) {
    if (UpKeys.includes(event.key) && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if (DownKeys.includes(event.key) && cursorLoc < 4) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
    if (ForwardKeys.includes(event.key)) {
      updateScreen(menuItems[cursorLoc].screen);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });

  return (
    <div className='flex h-full w-full items-center'>
      <ul>
        {menuItems.map((item, i) => (
          <li key={item.label} tabIndex={-1} id={'select'}>
            <div className='flex pt-1 items-center text-xs'>
              {cursorLoc === i ? <FaPlay className='mr-2' /> : null}
              <span onClick={() => updateScreen(item.screen)}>
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
