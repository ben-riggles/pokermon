import { DetailsRes, PlayerReq, PlayersRes } from '@/types/endpoints/players';
import { TournamentsRes } from '@/types/endpoints/tournaments';
import axios from 'axios';

const local = 'http://localhost:7777';

export const playersApi = {
  getAllPlayers: async () => axios.get<PlayersRes[]>(`${local}/players`),
  getPlayer: async (id: number) =>
    axios.get<PlayersRes>(`${local}/players/${id}`),
  postPlayer: async (req: PlayerReq) =>
    axios.post<PlayersRes>(`${local}/players`, req),
  putPlayer: async (id: number, req: PlayerReq) =>
    axios.put<PlayersRes>(`${local}/players/${id}`, req),
  deletePlayer: async (id: number) =>
    axios.delete<PlayersRes>(`${local}/players/${id}`),
  getAllPlayerDetails: async () =>
    axios.get<DetailsRes[]>(`${local}/players/details`),
  getPlayerDetails: async (id: number) =>
    axios.get<DetailsRes>(`${local}/players/${id}/details`),
};

export const tournamentsApi = {
  getTournaments: async () =>
    axios.get<TournamentsRes[]>(`${local}/tournaments`),
  getTournament: async (sessionId: number) =>
    axios.get<TournamentsRes>(`${local}/tournaments/${sessionId}`),
};
