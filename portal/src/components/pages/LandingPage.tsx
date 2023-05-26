import { useState } from 'react';
import Menu from '@/components/ui/Menu';
import PokerChip from '@/components/ui/icons/PokerChip';
import useClickedOutside from '@/hooks/useClickedOutside';

export default function LandingPage() {
  const [chipClicked, setChipClicked] = useState(false);
  const optionsList = ['Players', 'Tournaments', 'Cash Games', 'Graphs'];
  const { ref } = useClickedOutside(setChipClicked);

  return (
    <div className='no-select h-screen'>
      <div className='p-4 text-xl center-flex'>Welcome to Pokermon!</div>
      <div className='center-flex flex-col' ref={ref}>
        <span
          className='pb-4 cursor-pointer slow-spin'
          onClick={() => setChipClicked(!chipClicked)}
        >
          <PokerChip height='50px' width='50px' />
        </span>

        {chipClicked && <Menu options={optionsList} />}
      </div>
    </div>
  );
}
