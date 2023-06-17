import { Screen } from '@/types/gameConsole';

type Zone = {
  screen: Screen;
  x: number;
  y: number;
  w: number;
  h: number;
};

const welcomeZones: Zone[] = [
  {
    screen: 'Bedroom',
    x: 46,
    y: 360,
    w: 68,
    h: 90,
  },
  {
    screen: 'Laboratory',
    x: 200,
    y: 180,
    w: 96,
    h: 70,
  },
  {
    screen: 'PokerCenter',
    x: 700,
    y: 78,
    w: 90,
    h: 80,
  },
  {
    screen: 'PokerMart',
    x: 765,
    y: 310,
    w: 150,
    h: 100,
  },
  {
    screen: 'Dojo',
    x: 1162,
    y: 28,
    w: 94,
    h: 70,
  },
];

const dojoZones: Zone[] = [];
const bedroomZones: Zone[] = [
  {
    screen: 'Computer',
    x: 46,
    y: 360,
    w: 68,
    h: 90,
  },
];

const laboratoryZones: Zone[] = [];
const pokerMartZones: Zone[] = [];
const pokerCenterZones: Zone[] = [];
const singlePlayerZones: Zone[] = [];

export const Zones = {
  Welcome: welcomeZones,
  Dojo: dojoZones,
  Bedroom: bedroomZones,
  Laboratory: laboratoryZones,
  PokerMart: pokerMartZones,
  PokerCenter: pokerCenterZones,
  SinglePlayer: singlePlayerZones,
};
