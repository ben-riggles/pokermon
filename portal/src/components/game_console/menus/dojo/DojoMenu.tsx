import useScreenStore from '@/stores/screenStore';

export default function DojoMenu() {
  const { updateScreen, updateMenu } = useScreenStore();

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <div>
      <div>Dojo</div>
      <div className='cursor-pointer' onClick={handleBack}>
        Back
      </div>
    </div>
  );
}
