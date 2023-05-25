import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import WindowWrapper from './WindowWrapper';

type Props = {
  options: string[];
};

export default function Menu({ options }: Props) {
  const [cursorLoc, setCursor] = useState(0);

  function arrowHandler(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
      console.log(cursorLoc);
    }
    if (event.key === 'ArrowDown' && cursorLoc < options.length - 1) {
      setCursor((cursorLoc) => cursorLoc + 1);
      console.log(cursorLoc);
    }
    console.log(event.key);
  }

  // Is it better to use seperate useEffects here?
  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });
  return (
    <>
      <WindowWrapper>
        <ul>
          {options.map((option: string, i) => {
            return (
              <li id={'select' + i.toString()} key={option + i}>
                <div className='flex p-1 m-1'>
                  {cursorLoc === i ? <FaPlay /> : null}
                  {option}
                </div>
              </li>
            );
          })}
        </ul>
      </WindowWrapper>
    </>
  );
}
