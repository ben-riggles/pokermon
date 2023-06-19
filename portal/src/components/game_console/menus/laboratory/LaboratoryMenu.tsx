import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import useScreenStore from '@/stores/screenStore';
import { Menu } from '@/types/gameConsole';
import { DownKeys, ForwardKeys, UpKeys } from '@/types/keys';
import MenuLink from '../../lib/MenuLink';
// import usePreviousScreen from '@/hooks/usePreviousScreen';

const menuItems: { label: string; menu: Menu }[] = [
  { label: 'Players', menu: 'All Players' },
  { label: 'Exit', menu: 'Welcome' },
];

export default function LaboratoryMenu() {
  const [cursorLoc, setCursor] = useState(0);
  const { updateScreen, updateMenu } = useScreenStore();

  function arrowHandler(event: KeyboardEvent) {
    if (UpKeys.includes(event.key) && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if (DownKeys.includes(event.key) && cursorLoc < 4) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
    if (ForwardKeys.includes(event.key)) {
      updateMenu(menuItems[cursorLoc].menu);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div className='flex flex-col h-full w-full items-center'>
      <div>Laboratory</div>
      <ul>
        {menuItems.map((item, i) => (
          <li key={item.label} tabIndex={-1} id={'select'}>
            <div className='flex pt-1 items-center text-xs'>
              {cursorLoc === i ? <FaPlay className='mr-2' /> : null}
              <span onClick={() => updateMenu(item.menu)}>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </div>
  );
}
