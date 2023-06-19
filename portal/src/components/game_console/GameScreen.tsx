import useGameStore from '@/stores/screenStore';
import WelcomeScreen from './screens/WelcomeScreen';
import PlayersScreen from './screens/PlayersScreen';
import WindowWrapper from '@/components/ui/WindowWrapper';
import { Menu } from '@/types/gameConsole';

function getMenu(menu: Menu): JSX.Element {
  switch (menu) {
    case 'Welcome':
      return <WelcomeScreen />;
    case 'Enter Player Info':
      return <PlayersScreen />;
    default:
      return <></>;
  }
}

export default function GameScreen() {
  const { menu } = useGameStore();
  return <WindowWrapper>{getMenu(menu)}</WindowWrapper>;
}
