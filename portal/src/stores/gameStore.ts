import { create } from 'zustand';

interface ScreenState {
  screenIndex: number;
  updateIndex: (i: number) => void;
}

const useScreenStore = create<ScreenState>()((set) => ({
  screenIndex: 0,
  updateIndex: (i) => set(() => ({ screenIndex: i })),
}));

export default useScreenStore;
