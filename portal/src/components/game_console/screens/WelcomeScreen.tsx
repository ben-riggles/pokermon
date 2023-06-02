import PokerChip from '@/components/ui/icons/PokerChip';

import useNextScreen from '@/hooks/useNextScreen';
import useScreenStore from '@/stores/screenStore';

export default function WelcomeScreen() {
  const { updateScreen } = useScreenStore();
  useNextScreen('Menu');

  return (
    <div className='h-full w-full'>
      <div className='p-4 text-xs center-flex text-center'>
        Welcome to Pokermon!
      </div>
      <span className='center-flex cursor-pointer slow-spin'>
        <span onClick={() => updateScreen('Menu')}>
          <PokerChip height='50px' width='50px' />
        </span>
      </span>
    </div>
  );
}
