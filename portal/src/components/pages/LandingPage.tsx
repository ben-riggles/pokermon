import { useState } from 'react';
import PokerChip from '../ui/icons/PokerChip';
import WindowCard from '../ui/WindowWrapper';

export default function LandingPage() {
  const [chipClicked, setChipClicked] = useState(false);
  return (
    <div>
      <span
        className='cursor-pointer'
        onClick={() => setChipClicked(!chipClicked)}
      >
        <PokerChip />
      </span>
      {chipClicked && (
        <WindowCard isOpen={setChipClicked}>
          <span>
            Welcome to PokerMon! Where we try to catch all the dollars.
          </span>
        </WindowCard>
      )}
    </div>
  );
}
