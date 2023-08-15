import { PropsWithChildren, ReactNode } from 'react';

interface MenuProgressBarProps {
  title: string;
  current: number;
  min?: number;
  max: number;
  valueRenderer?: (value: number) => ReactNode;
}

function getMeterColor(percentage: number): string {
  if (percentage > 0.66) {
    return 'bg-pkmn-green';
  } else if (percentage > 0.33) {
    return 'bg-pkmn-orange';
  } else {
    return 'bg-pkmn-red';
  }
}

export default function MenuProgressBar({
  title,
  current,
  min = 0,
  max,
  valueRenderer = (x) => <>{x}</>,
}: PropsWithChildren<MenuProgressBarProps>) {
  if (min > max) {
    throw new Error('MenuProgressBar given min value greater than max value');
  }

  // Clamp current to [min, max];
  current = Math.max(min, Math.min(current, max));
  const range = max - min;
  const percentage = range === 0 ? 1 : (current - min) / range;
  return (
    <div>
      {title}
      <div className='flex h-4 mt-1'>
        <div className=' bg-black text-xs text-orange-200 px-1'>XP:</div>
        <div className='w-48 h-4'>
          <div
            className={`h-2 mt-1 ${getMeterColor(percentage)}`}
            style={{ width: `${percentage * 100}%` }}
          ></div>
          <div className='w-full h-0.5 mt-0.5 bg-black'></div>
        </div>
        <div className='w-3 bg-black' />
      </div>
      <div className='ml-8 text-lg text-center'>{valueRenderer(current)}</div>
    </div>
  );
}
