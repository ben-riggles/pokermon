import { create } from 'zustand';
import { Menu, Screen } from '@/types/gameConsole';
import { AnyObj } from '@/types/generics';
import { DetailsRes } from '@/types/endpoints/players';

type ScreenState = {
  screen: Screen;
  menu: Menu;
  player: DetailsRes | AnyObj;
  updateScreen: (screen: Screen) => void;
  updatePlayer: (player: DetailsRes) => void;
  updateMenu: (menu: Menu) => void;
};

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  menu: 'Welcome',
  player: {},
  updateScreen: (screen: Screen) => set(() => ({ screen })),
  updatePlayer: (player) => set(() => ({ player })),
  updateMenu: (menu: Menu) => set(() => ({ menu })),
}));

export default useScreenStore;
