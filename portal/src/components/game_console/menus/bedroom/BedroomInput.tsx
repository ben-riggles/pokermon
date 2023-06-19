import useScreenStore from '@/stores/screenStore';

export default function BedroomInput() {
  const { updateMenu } = useScreenStore();

  function handleBack() {
    updateMenu('Bedroom Menu');
  }

  return (
    <div>
      <div>Input Your Info</div>
      <div className='cursor-pointer' onClick={handleBack}>
        Back
      </div>
    </div>
  );
}
