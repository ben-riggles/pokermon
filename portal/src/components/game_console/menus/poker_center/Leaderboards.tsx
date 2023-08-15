import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import MenuList from '@/components/game_console/lib/MenuList';
import MenuLink from '@/components/game_console/lib/MenuLink';
import { Leaderboard } from '@/types/endpoints/players';

export default function Leaderboards() {
  const { updateMenu, updateLeaderboard } = useScreenStore();

  function handleBack() {
    updateMenu('Poker Center Menu');
  }

  function handleLeaderboard(type: Leaderboard) {
    updateLeaderboard(type);
    updateMenu('Leaderboard');
  }

  return (
    <MenuPage title='Leaderboards' onBack={handleBack}>
      <MenuList itemGap='1'>
        <MenuLink onClick={() => handleLeaderboard('six_nine')}>
          Sixty Nines
        </MenuLink>
        <MenuLink onClick={() => handleLeaderboard('quads')}>Quads</MenuLink>
        <MenuLink onClick={() => handleLeaderboard('attendance')}>
          Attendance
        </MenuLink>
        <MenuLink onClick={() => handleLeaderboard('cash_net')}>
          Cash net
        </MenuLink>
        <MenuLink onClick={() => handleLeaderboard('tournament_net')}>
          Tournament Net
        </MenuLink>
        <MenuLink onClick={() => handleLeaderboard('other_net')}>
          Misc Net
        </MenuLink>
        <MenuLink onClick={() => handleLeaderboard('total_net')}>
          Total net
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
