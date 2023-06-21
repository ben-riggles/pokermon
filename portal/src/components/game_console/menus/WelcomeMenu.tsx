import PokerChip from '@/components/ui/icons/PokerChip';

export default function WelcomeScreen() {
  return (
    <div className='h-full w-full'>
      <div className='p-4 text-xs center-flex text-center'>
        Welcome to Pokermon!
      </div>
      <span className='center-flex cursor-pointer slow-spin'>
        <PokerChip height='50px' width='50px' />
      </span>
    </div>
  );
}
