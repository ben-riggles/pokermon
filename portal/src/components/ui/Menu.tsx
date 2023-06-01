import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import WindowWrapper from '@/components/ui/WindowWrapper';

type Props = {
  options: string[];
};

export default function Menu({ options }: Props) {
  const [cursorLoc, setCursor] = useState(0);

  function arrowHandler(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if (event.key === 'ArrowDown' && cursorLoc < options.length - 1) {
      setCursor((cursorLoc) => cursorLoc + 1);
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
        {options.map((option: string, i) => {
          return (
            <li id={'select' + i.toString()} key={option + i}>
              <div className='flex pt-1 items-center text-xs'>
                {cursorLoc === i ? <FaPlay className='mr-2' /> : null}
                {option}
              </div>
            </li>
          );
        })}
      </ul>
    </WindowWrapper>
  );
}
