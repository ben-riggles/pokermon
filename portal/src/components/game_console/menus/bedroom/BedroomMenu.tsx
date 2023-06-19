import useScreenStore from '@/stores/screenStore';

export default function BedroomMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Bedroom</div>
      <div className='cursor-pointer' onClick={handleBack}>
        Back
      </div>
    </div>
  );
}
