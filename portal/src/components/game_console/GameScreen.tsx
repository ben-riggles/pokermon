import useGameStore from '@/stores/screenStore';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import PlayersScreen from './screens/PlayersScreen';
import TournamentsScreen from './screens/TournamentsScreen';
import CashGamesScreen from './screens/CashGamesScreen';
import GraphsScreen from './screens/GraphsScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import WindowWrapper from '@/components/ui/WindowWrapper';

export default function GameScreen() {
  const { screen } = useGameStore();

  switch (screen) {
    case 'Welcome':
      return (
        <WindowWrapper>
          <WelcomeScreen />
        </WindowWrapper>
      );
    case 'Menu':
      return (
        <WindowWrapper>
          <MenuScreen />
        </WindowWrapper>
      );
    case 'Players':
      return (
        <WindowWrapper>
          <PlayersScreen />
        </WindowWrapper>
      );
    case 'Tournaments':
      return (
        <WindowWrapper>
          <TournamentsScreen />
        </WindowWrapper>
      );
    case 'CashGames':
      return (
        <WindowWrapper>
          <CashGamesScreen />
        </WindowWrapper>
      );
    case 'Graphs':
      return (
        <WindowWrapper>
          <GraphsScreen />
        </WindowWrapper>
      );
    case 'SinglePlayer':
      return (
        <WindowWrapper>
          <SinglePlayerScreen />
        </WindowWrapper>
      );
    default:
      return null;
  }
}
