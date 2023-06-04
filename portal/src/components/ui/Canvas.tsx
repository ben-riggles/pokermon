import { CanvasHTMLAttributes, useEffect, useRef } from 'react';

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function Canvas({ draw, ...props }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
