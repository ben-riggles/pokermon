import useGameStore from '@/stores/screenStore';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import PlayersScreen from './screens/PlayersScreen';
import TournamentsScreen from './screens/TournamentsScreen';
import CashGamesScreen from './screens/CashGamesScreen';
import GraphsScreen from './screens/GraphsScreen';

export default function GameScreen() {
  const { screen } = useGameStore();

  switch (screen) {
    case 'Welcome':
      return <WelcomeScreen />;
    case 'Menu':
      return <MenuScreen />;
    case 'Players':
      return <PlayersScreen />;
    case 'Tournaments':
      return <TournamentsScreen />;
    case 'CashGames':
      return <CashGamesScreen />;
    case 'Graphs':
      return <GraphsScreen />;
    default:
      return null;
  }
}
