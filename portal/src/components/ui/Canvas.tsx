import { useCallback, useEffect, useRef } from 'react';
import useScreenStore from '@/stores/screenStore';
import { Box, ClickableRegion, RegionsByScreen } from './zones';
import { ScreenInfo, Screens } from './screens';

type ClickInfo = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

const imageCache: { [key: string]: CanvasImageSource } = {};

const inBox = (x: number, y: number, box: Box): boolean => {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
};

function draw(
  ctx: CanvasRenderingContext2D,
  screenInfo: ScreenInfo,
  regions: ClickableRegion[],
  image: CanvasImageSource
) {
  ctx.canvas.width = screenInfo.width;
  ctx.canvas.height = screenInfo.height;
  ctx.drawImage(image, 0, 0);
  ctx.fillStyle = `rgba(255, 0,0,0.4)`;
  regions.forEach((region) => {
    const { x, y, w, h } = region.box;
    ctx.fillRect(x, y, w, h);
  });
}

function getCanvasEventPos(
  canvas: HTMLCanvasElement,
  e: MouseEvent
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
}

function getHitRegion(
  e: MouseEvent,
  canvas: HTMLCanvasElement,
  regions: ClickableRegion[]
): ClickableRegion | undefined {
  const { x, y } = getCanvasEventPos(canvas, e);
  const hit = regions.find((region) => inBox(x, y, region.box));
  return hit;
}

export default function Canvas({ ...props }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { updateScreen, updateMenu, screen } = useScreenStore();
  const regions = RegionsByScreen[screen];
  const clickInfo = useRef<ClickInfo>();
  const requestRef = useRef<number>();
  const screenImageRef = useRef<CanvasImageSource>();

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d')!;

    if (screenImageRef.current === undefined) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    draw(ctx, Screens[screen], regions, screenImageRef.current!);

    if (clickInfo.current === undefined) {
      return;
    }

    const circle = clickInfo.current;
    ctx.save();
    ctx.beginPath();
    ctx.stroke;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${circle.alpha})`;
    ctx.stroke();
    ctx.restore();

    circle.radius += 2;
    circle.alpha -= 0.05;
    if (circle.radius > 40) {
      clickInfo.current = undefined;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [regions, screen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const handleCanvasCursor = (e: MouseEvent) => {
      const { x, y } = getCanvasEventPos(canvas, e);
      const inRegion = regions.some((region) => inBox(x, y, region.box));
      canvas.style.cursor = inRegion ? 'pointer' : 'default';
    };

    const handleExitCanvasCursor = () => {
      canvas.style.cursor = 'default';
    };

    const handleClick = (evt: MouseEvent) => {
      const { x, y } = getCanvasEventPos(canvas, evt);
      clickInfo.current = { x, y, radius: 0, alpha: 1 };

      const region = getHitRegion(evt, canvasRef.current!, regions);
      if (region) {
        switch (region.type) {
          case 'SCREEN':
            updateScreen(region.screen);
            updateMenu(region.defaultMenu);
            break;
          case 'INFO':
            updateMenu(region.menu);
            break;
          default:
            break;
        }
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    // Try to store from cache instead of loading up a new image if possible.
    if (imageCache[screen]) {
      screenImageRef.current = imageCache[screen];
      requestRef.current = requestAnimationFrame(animate);
    } else {
      const img = new Image();
      img.src = Screens[screen].img;
      img.onload = () => {
        imageCache[screen] = img;
        screenImageRef.current = img;
        requestRef.current = requestAnimationFrame(animate);
      };
    }

    canvas.addEventListener('mousemove', handleCanvasCursor);
    canvas.addEventListener('mouseout', handleExitCanvasCursor);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleCanvasCursor);
      canvas.removeEventListener('mouseout', handleExitCanvasCursor);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [animate, regions, screen, updateMenu, updateScreen]);

  return <canvas ref={canvasRef} {...props} />;
}
