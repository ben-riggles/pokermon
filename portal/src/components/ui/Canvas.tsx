import { useEffect, useRef } from 'react';
import pokermonMap from '@/assets/pokermon_map.png';
import pokerCenter from '@/assets/poker_center.png';
import home from '@/assets/bedroom.png';
import { Zone } from '@/types/canvas';
import useScreenStore from '@/stores/screenStore';
import { Screen } from '@/types/gameConsole';

const mouseClick = {
  x: 0,
  y: 0,
};
const inBox = (x: number, y: number, box: Zone): boolean => {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
};

const zoneArray: Zone[] = [
  {
    screen: 'Bedroom',
    x: 50,
    y: 360,
    w: 60,
    h: 90,
  },
  {
    screen: 'Tournaments',
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

function draw(ctx: CanvasRenderingContext2D, screen?: Screen) {
  const img = new Image();
  img.src = pokermonMap;
  ctx.canvas.width = 1280;
  ctx.canvas.height = 720;
  if (screen === 'PokerCenter') {
    img.src = pokerCenter;
    ctx.canvas.width = 1024;
    ctx.canvas.height = 640;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fill();
    };
    return;
  }
  if (screen === 'Bedroom') {
    img.src = home;
    ctx.canvas.width = 1024;
    ctx.canvas.height = 640;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fill();
    };
    return;
  }
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = `rgba(255, 0,0,0.4)`;
    zoneArray.forEach(({ x, y, w, h }) => {
      ctx.fillRect(x, y, w, h);
    });
    ctx.fillStyle = `rgba(0,0,255,1)`;
    ctx.beginPath();
    ctx.arc(mouseClick.x, mouseClick.y, 20, 0, Math.PI * 2);
    ctx.fill();
  };
}

function onMouseClick(e: MouseEvent, canvas: HTMLCanvasElement): Screen {
  const rect = canvas.getBoundingClientRect();
  mouseClick.x = e.clientX - rect.left;
  mouseClick.y = e.clientY - rect.top;

  const hit = zoneArray.find((box) => inBox(mouseClick.x, mouseClick.y, box));
  if (hit) {
    return hit.screen;
  }
  return 'Welcome';
}

export default function Canvas({ ...props }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { updateScreen } = useScreenStore();

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const screen = onMouseClick(e, canvasRef.current!);
      updateScreen(screen);
      draw(canvasRef.current!.getContext('2d')!, screen);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext('2d');
    if (context) {
      draw(context);
    }
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}
