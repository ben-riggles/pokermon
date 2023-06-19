import { Screen } from '@/types/gameConsole';

export type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type ScreenRegion = {
  type: 'SCREEN';
  screen: Screen;
};

export type InfoRegion = {
  type: 'INFO';
  menuName: string;
};

export type RegionMetadata = ScreenRegion | InfoRegion;

export type ClickableRegion = {
  box: Box;
} & RegionMetadata;

const welcomeZones: ClickableRegion[] = [
  {
    type: 'SCREEN',
    screen: 'Bedroom',
    box: {
      x: 46,
      y: 360,
      w: 68,
      h: 90,
    },
  },
  {
    type: 'SCREEN',
    screen: 'Laboratory',
    box: {
      x: 200,
      y: 180,
      w: 96,
      h: 70,
    },
  },
  {
    type: 'SCREEN',
    screen: 'PokerCenter',
    box: {
      x: 700,
      y: 78,
      w: 90,
      h: 80,
    },
  },
  {
    type: 'SCREEN',
    screen: 'PokerMart',
    box: {
      x: 765,
      y: 310,
      w: 150,
      h: 100,
    },
  },
  {
    type: 'SCREEN',
    screen: 'Dojo',
    box: {
      x: 1162,
      y: 28,
      w: 94,
      h: 70,
    },
  },
];
const dojoZones: ClickableRegion[] = [];
const bedroomZones: ClickableRegion[] = [];
const laboratoryZones: ClickableRegion[] = [];
const pokerMartZones: ClickableRegion[] = [];
const pokerCenterZones: ClickableRegion[] = [];
const singlePlayerZones: ClickableRegion[] = [];

export const RegionsByScreen = {
  Welcome: welcomeZones,
  Dojo: dojoZones,
  Bedroom: bedroomZones,
  Laboratory: laboratoryZones,
  PokerMart: pokerMartZones,
  PokerCenter: pokerCenterZones,
  SinglePlayer: singlePlayerZones,
};
