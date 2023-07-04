import { useQuery } from '@tanstack/react-query';
import { playersApi } from './allEndpoints';

async function getPlayerDetails(playerId: number) {
  const res = await playersApi.getPlayerDetails(playerId);
  return res.data;
}

export default function usePlayerDetails(playerId: number) {
  const players = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => getPlayerDetails(playerId),
  });
  return players;
}
