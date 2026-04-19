import useScreenStore from '@/stores/screenStore';
import { DownKeys, UpKeys } from '@/types/keys';
import { useEffect, useState } from 'react';
import MenuLink from '@/components/game_console/lib/MenuLink';
import MenuList from '@/components/game_console/lib/MenuList';
import MenuPage from '@/components/game_console/lib/MenuPage';
import usePlayers from '@/api/usePlayers';

export default function PlayersMenu() {
  const [cursorLoc, setCursor] = useState(0);
  const { updatePlayerId, updateMenu } = useScreenStore();
  const { data: players, isLoading, isError } = usePlayers();

  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  });

  function handleBack() {
    updateMenu('Laboratory Menu');
  }

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function arrowHandler(event: KeyboardEvent) {
    if (UpKeys.includes(event.key) && cursorLoc > 0) {
      setCursor((cursorLoc) => cursorLoc - 1);
    }
    if (
      players &&
      DownKeys.includes(event.key) &&
      cursorLoc < players.length - 1
    ) {
      setCursor((cursorLoc) => cursorLoc + 1);
    }
  }

  return (
    <MenuPage title='Players' onBack={handleBack}>
      <div className='py-2'>
        <MenuList layout='grid'>
          {players.map((player) => (
            <MenuLink
              onClick={() => {
                updatePlayerId(player.id);
                updateMenu('Single Player');
              }}
              key={player.id}
            >
              <div className='flex h-8 w-32 items-center'>
                <img
                  className='h-12 min-w-[48px]'
                  src={`https://img.pokemondb.net/sprites/black-white/normal/${
                    player.sprite || 'snorlax'
                  }.png`}
                />
                <span className='text-xs text-left'>
                  {player.first_name} {player.last_name}
                </span>
              </div>
            </MenuLink>
          ))}
        </MenuList>
      </div>
    </MenuPage>
  );
}
