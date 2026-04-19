import { Screen } from '@/types/gameConsole';
import pokermonMap from '@/assets/pokermon_outside.png';
import pokerCenter from '@/assets/poker_center.png';
import bedroom from '@/assets/bedroom.png';
import laboratory from '@/assets/laboratory.png';
import pokerMart from '@/assets/poker_mart.png';
import dojo from '@/assets/dojo.png';

export type ScreenInfo = {
  img: string;
  width: number;
  height: number;
};

const WelcomeScreenInfo = {
  img: pokermonMap,
  width: 1280,
  height: 720,
};

const DojoScreenInfo = {
  img: dojo,
  width: 960,
  height: 640,
};

const BedroomScreenInfo = {
  img: bedroom,
  width: 1024,
  height: 640,
};

const LaboratoryScreenInfo = {
  img: laboratory,
  width: 1024,
  height: 640,
};

const PokerMartScreenInfo = {
  img: pokerMart,
  width: 1024,
  height: 640,
};

const PokerCenterScreenInfo = {
  img: pokerCenter,
  width: 1024,
  height: 640,
};

export const Screens: { [key in Screen]: ScreenInfo } = {
  Welcome: WelcomeScreenInfo,
  Dojo: DojoScreenInfo,
  Bedroom: BedroomScreenInfo,
  Laboratory: LaboratoryScreenInfo,
  PokerMart: PokerMartScreenInfo,
  PokerCenter: PokerCenterScreenInfo,
} as const;
