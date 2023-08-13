import { create } from 'zustand';
import { Menu, Screen } from '@/types/gameConsole';
import { Leaderboard } from '@/types/endpoints/players';

type ScreenState = {
  screen: Screen;
  menu: Menu;
  playerId: number;
  tournamentId: number;
  leaderboard: Leaderboard;
  updateScreen: (screen: Screen) => void;
  updatePlayerId: (playerId: number) => void;
  updateTournamentId: (tournamentId: number) => void;
  updateMenu: (menu: Menu) => void;
  updateLeaderboard: (leaderboard: Leaderboard) => void;
};

const useScreenStore = create<ScreenState>()((set) => ({
  screen: 'Welcome',
  menu: 'Welcome',
  playerId: 0,
  leaderboard: 'six_nine',
  tournamentId: 0,
  updateScreen: (screen: Screen) => set(() => ({ screen })),
  updatePlayerId: (playerId) => set(() => ({ playerId })),
  updateTournamentId: (tournamentId) => set(() => ({ tournamentId })),
  updateMenu: (menu: Menu) => set(() => ({ menu })),
  updateLeaderboard: (leaderboard: Leaderboard) => set(() => ({ leaderboard })),
}));

export default useScreenStore;
