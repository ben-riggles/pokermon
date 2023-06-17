import { useEffect, useRef } from 'react';
import pokermonMap from '@/assets/pokermon_outside.png';
import pokerCenter from '@/assets/poker_center.png';
import cozyShack from '@/assets/bedroom.png';
import laboratory from '@/assets/laboratory.png';
import pokerMart from '@/assets/poker_mart.png';
import { Zone } from '@/types/canvas';
import useScreenStore from '@/stores/screenStore';
import { Screen } from '@/types/gameConsole';
import { Zones } from './zones';

const mouseClick = {
  x: 0,
  y: 0,
};

const inBox = (x: number, y: number, box: Zone): boolean => {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
};

function draw(ctx: CanvasRenderingContext2D, screen: Screen) {
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
    img.src = cozyShack;
    ctx.canvas.width = 1024;
    ctx.canvas.height = 640;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fill();
      Zones[screen].forEach(({ x, y, w, h }) => {
        ctx.fillRect(x, y, w, h);
      });
    };
    return;
  }
  if (screen === 'Laboratory') {
    img.src = laboratory;
    ctx.canvas.width = 1024;
    ctx.canvas.height = 640;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fill();
    };
    return;
  }
  if (screen === 'PokerMart') {
    img.src = pokerMart;
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
    Zones[screen].forEach(({ x, y, w, h }) => {
      ctx.fillRect(x, y, w, h);
    });
    ctx.fillStyle = `rgba(0,0,255,1)`;
    ctx.beginPath();
    ctx.arc(mouseClick.x, mouseClick.y, 20, 0, Math.PI * 2);
    ctx.fill();
  };
}

function onMouseClick(
  e: MouseEvent,
  canvas: HTMLCanvasElement,
  screen: Screen
): Screen {
  const rect = canvas.getBoundingClientRect();
  mouseClick.x = e.clientX - rect.left;
  mouseClick.y = e.clientY - rect.top;

  const hitScreen = Zones[screen].find((box) =>
    inBox(mouseClick.x, mouseClick.y, box)
  );
  if (hitScreen) {
    return hitScreen.screen;
  }

  const hitInfo = Zones[screen].find((box) =>
    inBox(mouseClick.x, mouseClick.y, box)
  );

  // TODO: Figure out if you want to always go back to welcome screen when you click somewhere
  return 'Welcome';
}

export default function Canvas({ ...props }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { updateScreen, screen, info, updateInfo } = useScreenStore();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const newScreen = onMouseClick(e, canvasRef.current!, screen);
      updateScreen(newScreen);
      updateInfo(info);

      if (newScreen !== screen) {
        const ctx = canvasRef.current!.getContext('2d')!;
        draw(ctx, newScreen);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [screen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext('2d');
    if (context) {
      draw(context, screen);
    }

    function handleCanvasCursor(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      if (Zones[screen].some((zone) => inBox(mouseX, mouseY, zone))) {
        canvas!.style.cursor = 'pointer';
      } else {
        canvas!.style.cursor = 'default';
      }
    }

    function handleExitCanvasCursor() {
      canvas!.style.cursor = 'default';
    }

    canvas.addEventListener('mousemove', handleCanvasCursor);
    canvas.addEventListener('mouseout', handleExitCanvasCursor);

    return () => {
      canvas.removeEventListener('mousemove', handleCanvasCursor);
      canvas.removeEventListener('mouseout', handleExitCanvasCursor);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}
