import { ReactNode } from 'react';
import PokerChip from 'src/icons/PokerChip';

type Props = {
  children: ReactNode;
};

export default function WindowCard({ children }: Props) {
  return (
    <div>
      <section className='flex flex-col m-5 border-2 border-black w-80'>
        <div className='flex justify-between'>
          <div id='corner-up-left' className='mr-5'>
            <PokerChip height='15px' width='15px' />
          </div>
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
