import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import WindowWrapper from '@/components/ui/WindowWrapper';
import useScreenStore from '@/stores/screenStore';
import { Screen } from '@/types/gameConsole';

const menuItems: { label: string; screen: Screen }[] = [
  { label: 'Players', screen: 'Players' },
  { label: 'Tournaments', screen: 'Tournaments' },
  { label: 'CashGames', screen: 'CashGames' },
  { label: 'Graphs', screen: 'Graphs' },
  { label: 'Exit', screen: 'Welcome' },
];

export default function MenuScreen() {
  const [cursorLoc, setCursor] = useState(0);
  const { updateScreen } = useScreenStore();

  function arrowHandler(event: KeyboardEvent) {
    if ((event.key === 'ArrowUp' || event.key === 'k') && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if ((event.key === 'ArrowDown' || event.key === 'j') && cursorLoc < 4) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
    if (event.key === 'Enter') {
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
    <WindowWrapper>
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
    </WindowWrapper>
  );
}
