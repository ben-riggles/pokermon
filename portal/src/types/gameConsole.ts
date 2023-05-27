// Taken from Matt Peacocks video on enums
// https://www.youtube.com/watch?v=jjMbPt_H3RQ

export const SCREEN = {
  Welcome: 0,
  Menu: 1,
  Players: 2,
  Tournaments: 3,
  CashGames: 4,
  Graphs: 5,
} as const;

export type ObjectValues<T> = T[keyof T];
export type CurrentScreen = ObjectValues<typeof SCREEN>;
