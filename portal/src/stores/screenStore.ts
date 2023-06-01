import { create } from 'zustand';
import { Screen } from '@/types/gameConsole';
import { AnyObj } from '@/types/generics';
import { DetailsRes } from '@/types/endpoints/players';

type ScreenState = {
  screen: Screen;
  player: DetailsRes | AnyObj;
  updateScreen: (screen: Screen) => void;
  updatePlayer: (player: DetailsRes) => void;
};

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  player: {},
  updateScreen: (screen: Screen) => set(() => ({ screen })),
  updatePlayer: (player) => set(() => ({ player })),
}));

export default useScreenStore;
