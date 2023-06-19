import { create } from 'zustand';
import { Menu, Screen } from '@/types/gameConsole';
import { AnyObj } from '@/types/generics';
import { DetailsRes, Leaderboard } from '@/types/endpoints/players';

type ScreenState = {
  screen: Screen;
  menu: Menu;
  player: DetailsRes | AnyObj;
  leaderboard: Leaderboard;
  updateScreen: (screen: Screen) => void;
  updatePlayer: (player: DetailsRes) => void;
  updateMenu: (menu: Menu) => void;
  updateLeaderboard: (leaderboard: Leaderboard) => void;
};

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  menu: 'Welcome',
  player: {},
  leaderboard: 'six_nine',
  updateScreen: (screen: Screen) => set(() => ({ screen })),
  updatePlayer: (player) => set(() => ({ player })),
  updateMenu: (menu: Menu) => set(() => ({ menu })),
  updateLeaderboard: (leaderboard: Leaderboard) => set(() => ({ leaderboard })),
}));

export default useScreenStore;
