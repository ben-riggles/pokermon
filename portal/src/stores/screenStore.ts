import { create } from 'zustand';
import { Screen } from '@/types/gameConsole';
import { AnyObj } from '@/types/generics';
import { Player } from '@/types/players';

type ScreenState = {
  screen: Screen;
  player: Player | AnyObj;
  updateScreen: (screen: Screen) => void;
  updatePlayer: (player: Player) => void;
};

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  player: {},
  updateScreen: (screen: Screen) => set(() => ({ screen })),
  updatePlayer: (player) => set(() => ({ player })),
}));

export default useScreenStore;
