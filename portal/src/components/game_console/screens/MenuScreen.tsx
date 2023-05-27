import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import WindowWrapper from '@/components/ui/WindowWrapper';
import useScreenStore from '@/stores/gameStore';
import { SCREEN } from '@/types/gameConsole';

export default function MenuScreen() {
  const [cursorLoc, setCursor] = useState(0);
  const { updateIndex } = useScreenStore();

  function arrowHandler(event: KeyboardEvent) {
    if ((event.key === 'ArrowUp' || event.key === 'k') && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if ((event.key === 'ArrowDown' || event.key === 'j') && cursorLoc < 4) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
    if (event.key === 'Enter') {
      if (cursorLoc === 4) {
        updateIndex(SCREEN.Welcome);
        return;
      }
      updateIndex(cursorLoc + 2);
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
        <li id={'select'}>
          <div className='flex pt-1 items-center text-xs'>
            {cursorLoc === 0 ? <FaPlay className='mr-2' /> : null}
            <span onClick={() => updateIndex(SCREEN.Players)}>Players</span>
          </div>
        </li>

        <li id={'select'}>
          <div className='flex pt-1 items-center text-xs'>
            {cursorLoc === 1 ? <FaPlay className='mr-2' /> : null}
            <span onClick={() => updateIndex(SCREEN.Tournaments)}>
              Tournaments
            </span>
          </div>
        </li>

        <li id={'select'}>
          <div className='flex pt-1 items-center text-xs'>
            {cursorLoc === 2 ? <FaPlay className='mr-2' /> : null}
            <span onClick={() => updateIndex(SCREEN.CashGames)}>
              Cash Games
            </span>
          </div>
        </li>

        <li id={'select'}>
          <div className='flex pt-1 items-center text-xs'>
            {cursorLoc === 3 ? <FaPlay className='mr-2' /> : null}
            <span onClick={() => updateIndex(SCREEN.Graphs)}>Graphs</span>
          </div>
        </li>

        <li id={'select'}>
          <div className='flex pt-1 items-center text-xs'>
            {cursorLoc === 4 ? <FaPlay className='mr-2' /> : null}
            <span onClick={() => updateIndex(SCREEN.Welcome)}>Exit</span>
          </div>
        </li>
      </ul>
    </WindowWrapper>
  );
}
