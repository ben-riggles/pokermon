import { useState, useEffect, Fragment } from 'react';
import useScreenStore from '@/stores/screenStore';
import { Menu } from '@/types/gameConsole';
import { DownKeys, ForwardKeys, UpKeys } from '@/types/keys';
import MenuLink from '../../lib/MenuLink';
import MenuList from '../../lib/MenuList';
import MenuPage from '../../lib/MenuPage';

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
    if (DownKeys.includes(event.key) && cursorLoc < 1) {
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
    <MenuPage title='Laboratory' onBack={handleBack}>
      <MenuList>
        {menuItems.map((item) => (
          <Fragment key={item.label}>
            <MenuLink onClick={() => updateMenu(item.menu)}>
              {item.label}
            </MenuLink>
          </Fragment>
        ))}
      </MenuList>
      <MenuLink onClick={handleBack}>Back</MenuLink>
    </MenuPage>
  );
}
