import { useState } from 'react';
import PokerChip from '../ui/icons/PokerChip';
import Menu from '../ui/Menu';

export default function LandingPage() {
  const [chipClicked, setChipClicked] = useState(false);
  const optionsList = ['Players', 'Tournaments', 'Cash Games', 'Graphs']
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <span
        className='cursor-pointer '
        onClick={() => setChipClicked(!chipClicked)}
      >
        <PokerChip height='200px' width='200px' />
      </span>
      
      {chipClicked && (
        <Menu options={optionsList} isOpen={setChipClicked} />
      )}
    </div>
  );
}
