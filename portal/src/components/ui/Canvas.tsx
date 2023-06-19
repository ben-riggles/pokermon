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
  const imgRef = useRef<CanvasImageSource>();

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d')!;
    draw(ctx, Screens[screen], regions, imgRef.current!);

    if (clickInfo.current) {
      const circle = clickInfo.current;
      if (circle.radius >= 40) {
        clickInfo.current = undefined;
        return;
      }

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
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [regions, screen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const region = getHitRegion(e, canvasRef.current!, regions);
      if (!region) return;
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
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [screen, regions, updateScreen, updateMenu]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    function handleCanvasCursor(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      if (regions.some((region) => inBox(mouseX, mouseY, region.box))) {
        canvas!.style.cursor = 'pointer';
      } else {
        canvas!.style.cursor = 'default';
      }
    }

    function handleExitCanvasCursor() {
      canvas!.style.cursor = 'default';
    }

    const handleClick = (evt: MouseEvent) => {
      const { x, y } = getCanvasEventPos(canvas, evt);
      clickInfo.current = { x, y, radius: 0, alpha: 1 };
    };

    canvas.addEventListener('mousemove', handleCanvasCursor);
    canvas.addEventListener('mouseout', handleExitCanvasCursor);
    canvas.addEventListener('click', handleClick);

    if (context) {
      const img = new Image();
      img.src = Screens[screen].img;
      img.onload = () => {
        imgRef.current = img;
        requestRef.current = requestAnimationFrame(animate);
      };
    }

    return () => {
      canvas.removeEventListener('mousemove', handleCanvasCursor);
      canvas.removeEventListener('mouseout', handleExitCanvasCursor);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [animate, regions, screen]);

  return <canvas ref={canvasRef} {...props} />;
}
