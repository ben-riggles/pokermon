import { useQuery } from '@tanstack/react-query';
import { tournamentsApi } from './allEndpoints';

async function getTournaments() {
  const res = await tournamentsApi.getTournaments();
  return res.data;
}

export default function useTournaments() {
  const players = useQuery({
    queryKey: ['tournaments'],
    queryFn: getTournaments,
  });
  return players;
}
