import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { playersApi } from './allEndpoints';
import { PlayersReq, PlayersRes } from '@/types/endpoints/players';

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

export function usePutPlayer(selectedPerson: PlayersRes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (playerReq: PlayersReq) =>
      playersApi.putPlayer(selectedPerson.id, playerReq),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
}
