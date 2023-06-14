import useGameStore from '@/stores/screenStore';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import PlayersScreen from './screens/PlayersScreen';
import TournamentsScreen from './screens/TournamentsScreen';
import CashGamesScreen from './screens/CashGamesScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import WindowWrapper from '@/components/ui/WindowWrapper';
import PokerCenterScreen from './screens/PokerCenterScreen';

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
    case 'Bedroom':
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
    case 'PokerCenter':
      return (
        <WindowWrapper>
          <PokerCenterScreen />
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
