import { Menu, Screen } from '@/types/gameConsole';

export type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type ScreenRegion = {
  type: 'SCREEN';
  defaultMenu: Menu;
  screen: Screen;
};

export type InfoRegion = {
  type: 'INFO';
  menu: Menu;
};

export type RegionMetadata = ScreenRegion | InfoRegion;

export type ClickableRegion = {
  box: Box;
} & RegionMetadata;

const welcomeZones: ClickableRegion[] = [
  {
    type: 'SCREEN',
    screen: 'Bedroom',
    defaultMenu: 'Bedroom Menu',
    box: { x: 46, y: 360, w: 68, h: 90 },
  },
  {
    type: 'SCREEN',
    screen: 'Laboratory',
    defaultMenu: 'Laboratory Menu',
    box: { x: 200, y: 180, w: 96, h: 70 },
  },
  {
    type: 'SCREEN',
    screen: 'PokerCenter',
    defaultMenu: 'Poker Center Menu',
    box: { x: 700, y: 78, w: 90, h: 80 },
  },
  {
    type: 'SCREEN',
    screen: 'PokerMart',
    defaultMenu: 'Poker Mart Menu',
    box: { x: 765, y: 310, w: 150, h: 100 },
  },
  {
    type: 'SCREEN',
    screen: 'Dojo',
    defaultMenu: 'Dojo Menu',
    box: { x: 1162, y: 28, w: 94, h: 70 },
  },
];

const dojoZones: ClickableRegion[] = [];

const bedroomZones: ClickableRegion[] = [
  {
    type: 'INFO',
    menu: 'Bedroom Input',
    box: { x: 510, y: 5, w: 100, h: 55 },
  },
];

const laboratoryZones: ClickableRegion[] = [];

const pokerMartZones: ClickableRegion[] = [];

const pokerCenterZones: ClickableRegion[] = [];

export const RegionsByScreen = {
  Welcome: welcomeZones,
  Dojo: dojoZones,
  Bedroom: bedroomZones,
  Laboratory: laboratoryZones,
  PokerMart: pokerMartZones,
  PokerCenter: pokerCenterZones,
} as const;
