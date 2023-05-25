import { ReactNode } from 'react';
import PokerChip from '@/components/ui/icons/PokerChip';
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
      <div id='upper_left'>
        <Spade />
      </div>
      <div id='upper_right'>
        <Heart />
      </div>
      <div id='lower_left'>
        <Diamond />
      </div>
      <div id='lower_right'>
        <Club />
      </div>
      {children}
    </div>
  );

  return (
    <div>
      <section className='flex flex-col m-5 border-2 border-black w-80'>
        <div className='flex justify-between'>
          <div id='corner-up-right'>
            <PokerChip height='15px' width='15px' />
          </div>
        </div>
        <div>
          <div className='ml-3 mr-3 border-2 border-black'>
            <div className='p-2'>{children}</div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div id='corner-down-left'>
            <PokerChip height='15px' width='15px' />
          </div>
          <div id='corner-down-right'>
            <PokerChip height='15px' width='15px' />
          </div>
        </div>
      </section>
    </div>
  );
}
