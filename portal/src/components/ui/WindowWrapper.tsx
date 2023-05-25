import { ReactNode } from 'react';
import Spade from './icons/Spade';
import Heart from './icons/Heart';
import Diamond from './icons/Diamond';
import Club from './icons/Club';

type Props = {
  children: ReactNode;
};

export default function WindowWrapper({ children }: Props) {
  return (
    <div className='box'>
      <div className='absolute top-0 left-0'>
        <Spade />
      </div>
      <div className='absolute top-0 right-0'>
        <Heart />
      </div>
      <div className='absolute bottom-0 left-0'>
        <Diamond />
      </div>
      <div className='absolute bottom-0 right-0'>
        <Club />
      </div>
      {children}
    </div>
  );
}
