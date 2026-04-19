import { DetailsRes, PlayersReq, PlayersRes } from '@/types/endpoints/players';
import { TournamentsRes } from '@/types/endpoints/tournaments';
import axios from 'axios';

const apiUrl = import.meta.env.PROD
  ? 'https://api.pokermon.club'
  : 'http://localhost:7777';

export const playersApi = {
  getAllPlayers: async () => axios.get<PlayersRes[]>(`${apiUrl}/players/`),
  getPlayer: async (id: number) =>
    axios.get<PlayersRes>(`${apiUrl}/players/${id}`),
  postPlayer: async (req: PlayersReq) =>
    axios.post<PlayersRes>(`${apiUrl}/players/`, req),
  putPlayer: async (id: number, req: PlayersReq) =>
    axios.put<PlayersRes>(`${apiUrl}/players/${id}`, req),
  deletePlayer: async (id: number) =>
    axios.delete<PlayersRes>(`${apiUrl}/players/${id}`),
  getAllPlayerDetails: async () =>
    axios.get<DetailsRes[]>(`${apiUrl}/players/details`),
  getPlayerDetails: async (id: number) =>
    axios.get<DetailsRes>(`${apiUrl}/players/${id}/details`),
};

export const tournamentsApi = {
  getTournaments: async () =>
    axios.get<TournamentsRes[]>(`${apiUrl}/tournaments/`),
  getTournament: async (sessionId: number) =>
    axios.get<TournamentsRes>(`${apiUrl}/tournaments/${sessionId}`),
};
