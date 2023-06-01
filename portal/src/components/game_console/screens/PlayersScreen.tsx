import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';
import { DownKeys, ForwardKeys, UpKeys } from '@/types/keys';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const players = [
  {
    id: 0,
    name: 'Ben Riggatoni',
    age: 31,
    tourneyPlacements: 2,
    sixNine: 6,
    quads: 0,
    straightFlush: 0,
    biggestCash: '$69',
    sprite: 'https://img.pokemondb.net/sprites/sword-shield/normal/jolteon.png',
  },
  {
    id: 1,
    name: 'Joe Schmo',
    age: 23,
    tourneyPlacements: 5,
    sixNine: 9,
    quads: 1,
    straightFlush: 0,
    biggestCash: '$121',
    sprite: 'https://img.pokemondb.net/sprites/sword-shield/normal/flareon.png',
  },
  {
    id: 2,
    name: 'Billy Mayes',
    age: 44,
    tourneyPlacements: 1,
    sixNine: 11,
    quads: 51,
    straightFlush: 72,
    biggestCash: '$2145',
    sprite:
      'https://img.pokemondb.net/sprites/sword-shield/normal/vaporeon.png',
  },
];

export default function PlayersScreen() {
  const [cursorLoc, setCursor] = useState(0);
  usePreviousScreen('Menu');
  const { updateScreen, updatePlayer } = useScreenStore();

  function arrowHandler(event: KeyboardEvent) {
    if (UpKeys.includes(event.key) && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if (DownKeys.includes(event.key) && cursorLoc < players.length - 1) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
    if (ForwardKeys.includes(event.key)) {
      updatePlayer(players[cursorLoc]);
      updateScreen('SinglePlayer');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });

  return (
    <div className='h-full pt-2 w-full'>
      {players.map((player, i) => (
        <div
          onClick={() => {
            updatePlayer(players[players.indexOf(player)]);
            updateScreen('SinglePlayer');
          }}
          className='flex items-end h-8 text-xs'
          key={player.id}
        >
          <div className='flex h-full items-center'>
            {cursorLoc === i ? <FaPlay /> : null}
          </div>
          <div className='flex h-12'>
            <img src={player.sprite} />
          </div>
          <span>{player.name} </span>
        </div>
      ))}
    </div>
  );
}
