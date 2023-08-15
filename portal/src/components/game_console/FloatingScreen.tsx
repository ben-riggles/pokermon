import useGameStore from '@/stores/screenStore';
import WelcomeMenu from '@/components/game_console/menus/WelcomeMenu';
import PlayersMenu from '@/components/game_console/menus/laboratory/PlayersMenu';
import WindowWrapper from '@/components/ui/WindowWrapper';
import { Menu } from '@/types/gameConsole';
import SinglePlayerMenu from '@/components/game_console/menus/laboratory/SinglePlayerMenu';
import BedroomMenu from '@/components/game_console/menus/bedroom/BedroomMenu';
import LaboratoryMenu from '@/components/game_console/menus/laboratory/LaboratoryMenu';
import PokerCenterMenu from '@/components/game_console/menus/poker_center/PokerCenterMenu';
import PokerMartMenu from '@/components/game_console/menus/poker_mart/PokerMartMenu';
import DojoMenu from '@/components/game_console/menus/dojo//DojoMenu';
import BedroomInput from '@/components/game_console/menus/bedroom/BedroomInput';
import Leaderboards from '@/components/game_console/menus/poker_center/Leaderboards';
import Leaderboard from '@/components/game_console/menus/poker_center/Leaderboard';
import Tournaments from '@/components/game_console/menus/dojo/Tournaments';
import SingleTournament from '@/components/game_console/menus/dojo/SingleTournament';
import SubmitPlacements from '@/components/game_console/menus/dojo/SubmitPlacements';
import SingleTournamentPlacements from '@/components/game_console/menus/dojo/SingleTournamentPlacements';

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
    case 'Submit Placements':
      return <SubmitPlacements />;
    case 'Tournaments':
      return <Tournaments />;
    case 'Single Tournament':
      return <SingleTournament />;
    case 'Tournament Placements':
      return <SingleTournamentPlacements />;
    default:
      return <></>;
  }
}

export default function FloatingScreen() {
  const { menu } = useGameStore();
  return <WindowWrapper>{getMenu(menu)}</WindowWrapper>;
}
