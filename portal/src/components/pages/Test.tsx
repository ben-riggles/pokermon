import { useState } from 'react';
import Menu from '@/components/ui/Menu';
import PokerChip from '@/components/ui/icons/PokerChip';

export default function LandingPage() {
  const [chipClicked, setChipClicked] = useState(false);
  const optionsList = ['Players', 'Tournaments', 'Cash Games', 'Graphs'];
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <span
        className='cursor-pointer '
        onClick={() => setChipClicked(!chipClicked)}
      >
        <PokerChip height='200px' width='200px' />
      </span>

      {chipClicked && <Menu options={optionsList} />}
    </div>
  );
}
