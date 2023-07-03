import useGameStore from '@/stores/screenStore';
import WelcomeMenu from './menus/WelcomeMenu';
import PlayersMenu from './menus/laboratory/PlayersMenu';
import WindowWrapper from '@/components/ui/WindowWrapper';
import { Menu } from '@/types/gameConsole';
import SinglePlayerMenu from './menus/laboratory/SinglePlayerMenu';
import BedroomMenu from './menus/bedroom/BedroomMenu';
import LaboratoryMenu from './menus/laboratory/LaboratoryMenu';
import PokerCenterMenu from './menus/poker_center/PokerCenterMenu';
import PokerMartMenu from './menus/poker_mart/PokerMartMenu';
import DojoMenu from './menus/dojo//DojoMenu';
import BedroomInput from './menus/bedroom/BedroomInput';
import Leaderboards from './menus/laboratory/Leaderboards';
import Leaderboard from './menus/laboratory/Leaderboard';
import Tournaments from './menus/dojo/Tournaments';
import TournamentPlacements from './menus/dojo/TournamentPlacements';

function getMenu(menu: Menu): JSX.Element {
  switch (menu) {
    case 'Welcome':
      return <WelcomeMenu />;
    case 'All Players':
      return <PlayersMenu />;
    case 'Single Player':
      return <SinglePlayerMenu />;
    case 'Bedroom Menu':
      return <BedroomMenu />;
    case 'Laboratory Menu':
      return <LaboratoryMenu />;
    case 'Poker Center Menu':
      return <PokerCenterMenu />;
    case 'Poker Mart Menu':
      return <PokerMartMenu />;
    case 'Dojo Menu':
      return <DojoMenu />;
    case 'Bedroom Input':
      return <BedroomInput />;
    case 'Leaderboards':
      return <Leaderboards />;
    case 'Leaderboard':
      return <Leaderboard />;
    case 'Tournament Placements':
      return <TournamentPlacements />;
    case 'Tournaments':
      return <Tournaments />;
    default:
      return <></>;
  }
}

export default function FloatingScreen() {
  const { menu } = useGameStore();
  return <WindowWrapper>{getMenu(menu)}</WindowWrapper>;
}
