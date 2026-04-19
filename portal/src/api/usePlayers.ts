import { useQuery } from '@tanstack/react-query';
import { playersApi } from './allEndpoints';

async function getPlayers() {
  const res = await playersApi.getAllPlayers();
  return res.data;
}

export default function usePlayers() {
  const players = useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  });
  return players;
}
