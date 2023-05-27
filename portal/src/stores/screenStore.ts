import { create } from 'zustand';
import { Screen } from '@/types/gameConsole';

interface ScreenState {
  screen: Screen;
  updateScreen: (screen: Screen) => void;
}

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  updateScreen: (screen: Screen) => set(() => ({ screen })),
}));

export default useScreenStore;
