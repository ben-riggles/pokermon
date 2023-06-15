import { Screen } from "@/types/gameConsole";

type Zone = {
    screen: Screen,
    x: number,
    y: number,
    w: number,
    h: number
};

type ScreenZones = {
    [screen in Screen]: Zone[];
};

const welcomeZones: Zone[] = [
    {
      screen: 'Bedroom',
      x: 50,
      y: 360,
      w: 60,
      h: 90,
    },
    {
      screen: 'Laboratory',
      x: 200,
      y: 180,
      w: 100,
      h: 70,
    },
    {
      screen: 'CashGames',
      x: 520,
      y: 20,
      w: 60,
      h: 70,
    },
    {
      screen: 'PokerCenter',
      x: 650,
      y: 120,
      w: 90,
      h: 80,
    },
    {
      screen: 'Menu',
      x: 1162,
      y: 28,
      w: 94,
      h: 70,
    },
  ];
const menuZones: Zone[] = [];
const bedroomZones: Zone[] = [];
const laboratoryZones: Zone[] = [];
const cashGamesZones: Zone[] = [];
const pokerCenterZones: Zone[] = [];
const singlePlayerZones: Zone[] = [];

export const Zones: ScreenZones = {
    'Welcome': welcomeZones,
    'Menu': menuZones,
    'Bedroom': bedroomZones,
    'Laboratory': laboratoryZones,
    'CashGames': cashGamesZones,
    'PokerCenter': pokerCenterZones,
    'SinglePlayer': singlePlayerZones,
} as const;