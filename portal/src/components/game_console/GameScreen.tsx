import useGameStore from '@/stores/screenStore';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import PlayersScreen from './screens/PlayersScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import WindowWrapper from '@/components/ui/WindowWrapper';
import PokerCenterScreen from './screens/PokerCenterScreen';
import LaboratoryScreen from './screens/LaboratoryScreen';
import PokerMartScreen from './screens/PokerMartScreen';

export default function GameScreen() {
  const { screen } = useGameStore();

  switch (screen) {
    case 'Welcome':
      return (
        <WindowWrapper>
          <WelcomeScreen />
        </WindowWrapper>
      );
    case 'Dojo':
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
    case 'Laboratory':
      return (
        <WindowWrapper>
          <LaboratoryScreen />
        </WindowWrapper>
      );
    case 'PokerMart':
      return (
        <WindowWrapper>
          <PokerMartScreen />
        </WindowWrapper>
      );
    case 'PokerCenter':
      return (
        <WindowWrapper>
          <PokerCenterScreen />
        </WindowWrapper>
      );
    case 'Computer':
      return (
        <WindowWrapper>
          <SinglePlayerScreen />
        </WindowWrapper>
      );
    default:
      return null;
  }
}
