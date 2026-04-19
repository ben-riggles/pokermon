import { useQuery } from '@tanstack/react-query';
import { tournamentsApi } from './allEndpoints';

async function getSingleTournament(sessionId: number) {
  const res = await tournamentsApi.getTournament(sessionId);
  return res.data;
}

export default function useSingleTournament(sessionId: number) {
  const players = useQuery({
    queryKey: ['tournaments', 'single tournament'],
    queryFn: () => getSingleTournament(sessionId),
  });
  return players;
}
