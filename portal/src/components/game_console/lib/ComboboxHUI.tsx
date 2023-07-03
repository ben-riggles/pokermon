import { Dispatch, SetStateAction, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { Placement } from '@/components/game_console/menus/dojo/TournamentPlacements';
import { PlayersRes } from '@/types/endpoints/players';

type Props = {
  index: number;
  place: number;
  players: PlayersRes[];
  placements: Placement[];
  setPlacements: Dispatch<SetStateAction<Placement[]>>;
};

export default function ComboboxHUI({
  index,
  place,
  players,
  placements,
  setPlacements,
}: Props) {
  const [selectedPerson, setSelectedPerson] = useState<PlayersRes>({
    id: 0,
    first_name: '',
    last_name: '',
    sprite: 'snorlax',
  });
  const [query, setQuery] = useState('');

  const filteredPlayers =
    query === ''
      ? players
      : players.filter((player) => {
          return (player.first_name + ' ' + player.last_name)
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  function handleSelection(e: PlayersRes) {
    setSelectedPerson(e);
    placements[index].id = e.id;
    placements[index].place = place;

    setPlacements([...placements]);
  }
  return (
    <Combobox value={selectedPerson} onChange={(e) => handleSelection(e)}>
      <label>{place}</label>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Enter Player'
        className={'pl-2'}
        displayValue={(player: PlayersRes) => {
          if (player.first_name && player.last_name) {
            return player.first_name + ' ' + player.last_name;
          } else {
            return '';
          }
        }}
      />
      <Combobox.Options
        className={'relative z-10 border-2 border-black p-2 bg-gray-50'}
      >
        {filteredPlayers.map((player) => (
          <Combobox.Option key={player.id} value={player}>
            {player.first_name + ' ' + player.last_name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
