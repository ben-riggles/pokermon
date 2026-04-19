import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import {
  DetailsRes,
  Leaderboard as LeaderboardType,
} from '@/types/endpoints/players';
import MenuList from '@/components/game_console/lib/MenuList';
import MenuProgressBar from '@/components/game_console/lib/MenuProgressBar';
import { currency } from '@/components/game_console/menus/laboratory/SinglePlayerMenu';
import useAllPlayerDetails from '@/api/useAllPlayerDetails';

function getTitle(leaderboard: LeaderboardType): string {
  switch (leaderboard) {
    case 'six_nine':
      return `Sixty Nines Leaderboard`;
    case 'total_net':
      return `Total Net Leaderboard`;
    case 'cash_net':
      return `Cash Net Leaderboard`;
    case 'tournament_net':
      return `Tournament Net Leaderboard`;
    case 'other_net':
      return `Other Net Leaderboard`;
    case 'quads':
      return `Quads Leaderboard`;
    case 'attendance':
      return `Attendance Leaderboard`;
  }
}

function getLeaderboardValue(
  player: DetailsRes,
  type: LeaderboardType
): number {
  return +player[type].toFixed(2);
}

export default function Leaderboard() {
  const { updateMenu, leaderboard } = useScreenStore();
  const { data: allPlayerDetails, isLoading, isError } = useAllPlayerDetails();

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }
  if (!allPlayerDetails || allPlayerDetails.length === 0) {
    return null;
  }

  function handleBack() {
    updateMenu('Leaderboards');
  }

  const rankedPlayers = [...allPlayerDetails].sort(
    (a, b) =>
      getLeaderboardValue(b, leaderboard) - getLeaderboardValue(a, leaderboard)
  );
  const topFive = rankedPlayers.slice(0, 5);

  const min = getLeaderboardValue(
    rankedPlayers[rankedPlayers.length - 1],
    leaderboard
  );
  const max = getLeaderboardValue(rankedPlayers[0], leaderboard);
  const isCurrencyType = [
    'total_net',
    'cash_net',
    'other_net',
    'tournament_net',
  ].includes(leaderboard);

  return (
    <MenuPage
      title={getTitle(leaderboard)}
      onBack={() => updateMenu('Leaderboards')}
    >
      <MenuList withCursor={false}>
        {topFive.map((player, index) => {
          return (
            <MenuProgressBar
              key={player.id}
              title={`${index + 1}. ${player.first_name} ${player.last_name}`}
              current={getLeaderboardValue(player, leaderboard)}
              min={min}
              max={max}
              valueRenderer={isCurrencyType ? currency : undefined}
            />
          );
        })}
      </MenuList>
    </MenuPage>
  );
}
