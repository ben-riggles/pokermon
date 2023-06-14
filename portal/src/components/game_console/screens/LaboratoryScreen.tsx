import useScreenStore from '@/stores/screenStore';

export default function LaboratoryScreen() {
  const { updateScreen } = useScreenStore();

  return (
    <div>
      <div>Laboratory</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Welcome')}>
        Back
      </div>
    </div>
  );
}
