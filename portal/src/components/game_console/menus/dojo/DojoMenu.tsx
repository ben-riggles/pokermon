import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import { useState } from 'react';

const place = [1, 2, 3];

export default function DojoMenu() {
  const { updateScreen, updateMenu } = useScreenStore();
  const [placements, setPlacements] = useState(place);

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  function handleAdd() {
    placements.push(placements[placements.length - 1] + 1);
    setPlacements([...placements]);
  }

  function handleRemove() {
    placements.pop();
    setPlacements([...placements]);
  }

  return (
    <MenuPage title='Dojo' onBack={handleBack}>
      <div
        className='cursor-pointer pb-2 text-sm flex justify-center'
        onClick={handleAdd}
      >
        Add Entrant +
      </div>
      {placements.map((placement) => {
        return (
          <div className='h-8'>
            <label> {placement} </label>
            <input className='pl-2' placeholder='Enter Player' />
          </div>
        );
      })}
      {placements.length > 3 && (
        <div
          className='cursor-pointer pt-2 text-sm flex justify-center'
          onClick={handleRemove}
        >
          Remove Entrant -
        </div>
      )}
    </MenuPage>
  );
}
