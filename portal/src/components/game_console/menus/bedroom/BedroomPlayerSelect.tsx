import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { PlayersRes } from '@/types/endpoints/players';

type Props = {
  players: PlayersRes[];
  selectedPerson: PlayersRes;
  setSelectedPerson: (e: PlayersRes) => void;
};

export default function BedroomPlayerSelect({
  players,
  setSelectedPerson,
  selectedPerson,
}: Props) {
  const [query, setQuery] = useState('');

  const filteredPlayers =
    query === ''
      ? players
      : players.filter((player) => {
          return (player.first_name + ' ' + player.last_name)
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={(e) => setSelectedPerson(e)}>
      <div className='flex flex-col w-52'>
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
      </div>
    </Combobox>
  );
}
