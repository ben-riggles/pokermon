import useScreenStore from '@/stores/screenStore';

export default function PokerCenterMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Poker Center</div>
      <div className='cursor-pointer' onClick={handleBack}>
        Back
      </div>
    </div>
  );
}
