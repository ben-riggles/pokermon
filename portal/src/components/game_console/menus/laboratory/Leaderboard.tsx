import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import {
  DetailsRes,
  Leaderboard as LeaderboardType,
} from '@/types/endpoints/players';
import { playersApi } from '@/api/allEndpoints';
import { useEffect, useState } from 'react';
import MenuList from '../../lib/MenuList';
import MenuProgressBar from '../../lib/MenuProgressBar';
import { currency } from './SinglePlayerMenu';

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
    case 'sessions':
      return `Sessions Leaderboard`;
  }
}

function getLeaderboardValue(
  player: DetailsRes,
  type: LeaderboardType
): number {
  if (type === 'sessions') {
    return player.sessions.length;
  }
  return player[type];
}

export default function Leaderboard() {
  const { updateMenu, leaderboard } = useScreenStore();
  const [players, setPlayers] = useState<DetailsRes[]>([]);

  useEffect(() => {
    async function getPlayerDetails() {
      const res = await playersApi.getAllPlayerDetails();
      setPlayers(res.data);
    }
    getPlayerDetails();
  }, [setPlayers]);

  if (players.length === 0) {
    return null;
  }

  const rankedPlayers = [...players].sort(
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
