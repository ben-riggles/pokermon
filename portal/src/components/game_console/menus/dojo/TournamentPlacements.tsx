import useScreenStore from '@/stores/screenStore';
import { useState } from 'react';
import MenuPage from '../../lib/MenuPage';
import ComboboxHUI from '@/components/game_console/lib/ComboboxHUI';
import usePlayers from '@/api/usePlayers';

const place = [
  {
    id: 0,
    place: 1,
  },
];

export type Placement = {
  id: number;
  place: number;
};

export default function TournamentPlacements() {
  const { updateMenu } = useScreenStore();
  const [placements, setPlacements] = useState<Placement[]>(place);
  const { data: players, isLoading, isError } = usePlayers();

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('Dojo Menu');
  }

  function handleAdd() {
    placements.push({
      id: 0,
      place: placements.length + 1,
    });
    setPlacements([...placements]);
  }

  function handleRemove() {
    placements.pop();
    setPlacements([...placements]);
  }

  function submitResults() {
    //TODO: Wait for POST endpoint, then implement POST Request here.
  }

  return (
    <MenuPage title='Tournament Placements' onBack={handleBack}>
      <div className='cursor-pointer pb-2 text-sm flex' onClick={handleAdd}>
        Add Entrant +
      </div>
      {placements.map((placement, index) => {
        return (
          <div key={placement.place} className='h-8'>
            <ComboboxHUI
              index={index}
              players={players}
              place={placement.place}
              placements={placements}
              setPlacements={setPlacements}
            />
          </div>
        );
      })}
      {placements.length > 1 && (
        <div
          className='cursor-pointer pt-2 text-sm flex'
          onClick={handleRemove}
        >
          Remove Entrant -
        </div>
      )}
      <button
        className='cursor-pointer p-3 hover:bg-sky-50 active:bg-sky-300 border-2 center-flex text-sm flex'
        onClick={submitResults}
      >
        Submit Results
      </button>
    </MenuPage>
  );
}
