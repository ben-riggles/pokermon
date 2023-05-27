import PokerChip from '@/components/ui/icons/PokerChip';
import useScreenStore from '@/stores/gameStore';

export default function WelcomeScreen() {
  const { updateIndex } = useScreenStore();

  return (
    <div className='h-full w-full'>
      <div className=''>
        <div className='p-4 text-xs center-flex text-center'>
          Welcome to Pokermon!
        </div>
        <span className='center-flex cursor-pointer slow-spin'>
          <span onClick={() => updateIndex(1)}>
            <PokerChip height='50px' width='50px' />
          </span>
        </span>
      </div>
    </div>
  );
}
