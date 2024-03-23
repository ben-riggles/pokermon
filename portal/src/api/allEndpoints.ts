import { DetailsRes, PlayersReq, PlayersRes } from '@/types/endpoints/players';
import { TournamentsRes } from '@/types/endpoints/tournaments';
import axios from 'axios';

// const local = 'http://localhost:7777';
const server = 'https://api.pokermon.club';

export const playersApi = {
  getAllPlayers: async () => axios.get<PlayersRes[]>(`${server}/players/`),
  getPlayer: async (id: number) =>
    axios.get<PlayersRes>(`${server}/players/${id}`),
  postPlayer: async (req: PlayersReq) =>
    axios.post<PlayersRes>(`${server}/players/`, req),
  putPlayer: async (id: number, req: PlayersReq) =>
    axios.put<PlayersRes>(`${server}/players/${id}`, req),
  deletePlayer: async (id: number) =>
    axios.delete<PlayersRes>(`${server}/players/${id}`),
  getAllPlayerDetails: async () =>
    axios.get<DetailsRes[]>(`${server}/players/details`),
  getPlayerDetails: async (id: number) =>
    axios.get<DetailsRes>(`${server}/players/${id}/details`),
};

export const tournamentsApi = {
  getTournaments: async () =>
    axios.get<TournamentsRes[]>(`${server}/tournaments/`),
  getTournament: async (sessionId: number) =>
    axios.get<TournamentsRes>(`${server}/tournaments/${sessionId}`),
};
