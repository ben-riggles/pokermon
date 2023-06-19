export type PlayersRes = {
  id: number;
  first_name: string;
  last_name: string;
};

export type PlayerReq = {
  first_name?: string;
  last_name?: string;
};

export type DetailsRes = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  total_net: number;
  cash_net: number;
  tournament_net: number;
  other_net: number;
  six_nine: number;
  quads: number;
  sprite: string;
  sessions: Sessions[];
};

export type Sessions = {
  session_id: number;
  date: string;
  other_game: string | null;
  cash_net: number;
  tournament_net: number;
  tournament_placement: number;
  other_net: number | null;
  six_nine: number;
  quads: number;
};

export type Leaderboard =
  | 'six_nine'
  | 'total_net'
  | 'cash_net'
  | 'tournament_net'
  | 'other_net'
  | 'six_nine'
  | 'quads'
  | 'sessions';
