import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TbPokerChip } from 'react-icons/tb';

type Props = {
  isOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function WindowCard({ isOpen, children }: Props) {
  return (
    <section className='flex flex-col border-2 border-black w-80'>
      <div className='flex border-black border-b-2'>
        <div
          onClick={() => isOpen(false)}
          className='center-flex p-1 border-r-2 border-black cursor-pointer'
        >
          <TbPokerChip />
        </div>
        <div className='pl-1 center-flex font-semibold'>Welcome Window</div>
      </div>
      <div className='p-2'>{children}</div>
    </section>
  );
}
