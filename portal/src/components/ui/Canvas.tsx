import { CanvasHTMLAttributes, useEffect, useRef } from 'react';
import pokermonMap from '@/assets/pokermon_map.png';

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const mouseClick = {
  x: 0,
  y: 0,
};
const inBox = (x: number, y: number, box: Zone) => {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
};

type Zone = {
  x: number;
  y: number;
  w: number;
  h: number;
};
const zoneArray = [
  {
    x: 100,
    y: 100,
    w: 100,
    h: 100,
  },
  {
    x: 200,
    y: 200,
    w: 100,
    h: 100,
  },
];

function draw(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = 1280;
  ctx.canvas.height = 720;
  const img = new Image();
  img.src = pokermonMap;
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

function onMouseClick(e: MouseEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  mouseClick.x = e.clientX - rect.left;
  mouseClick.y = e.clientY - rect.top;

  const hit = zoneArray.find((box) => inBox(mouseClick.x, mouseClick.y, box));
  if (hit) return hit;
}

export default function Canvas({ ...props }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      onMouseClick(e, canvasRef.current!);
      draw(canvasRef.current!.getContext('2d')!);
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
