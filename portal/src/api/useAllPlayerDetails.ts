import { useQuery } from '@tanstack/react-query';
import { playersApi } from './allEndpoints';

async function getAllPlayerDetails() {
  const res = await playersApi.getAllPlayerDetails();
  return res.data;
}

export default function useAllPlayerDetails() {
  const players = useQuery({
    queryKey: ['player'],
    queryFn: getAllPlayerDetails,
  });
  return players;
}
