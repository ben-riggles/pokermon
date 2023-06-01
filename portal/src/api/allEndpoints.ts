import { DetailsRes, PlayerReq, PlayersRes } from '@/types/endpoints/players';
import axios from 'axios';

const local = 'http://localhost:5000';

export const playersApi = {
  getAllPlayers: async () => axios.get<PlayersRes[]>(`${local}/players`),
  getPlayer: async (id: string) =>
    axios.get<PlayersRes>(`${local}/players/${id}`),
  postPlayer: async (req: PlayerReq) =>
    axios.post<PlayersRes>(`${local}/players`, req),
  putPlayer: async (id: string, req: PlayerReq) =>
    axios.put<PlayersRes>(`${local}/players/${id}`, req),
  deletePlayer: async (id: string) =>
    axios.delete<PlayersRes>(`${local}/players/${id}`),
  getAllPlayerDetails: async () =>
    axios.get<DetailsRes[]>(`${local}/players/details`),
  getPlayerDetails: async (id: string) =>
    axios.get<DetailsRes>(`${local}/players/${id}/details`),
};
