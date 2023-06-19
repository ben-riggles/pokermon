import { playersApi } from '@/api/allEndpoints';
import useScreenStore from '@/stores/screenStore';
import { DetailsRes } from '@/types/endpoints/players';
import { DownKeys, ForwardKeys, UpKeys } from '@/types/keys';
import { useEffect, useState } from 'react';
import MenuLink from '../../lib/MenuLink';
import MenuList from '../../lib/MenuList';
import MenuPage from '../../lib/MenuPage';

export default function PlayersMenu() {
  const [cursorLoc, setCursor] = useState(0);
  const [players, setPlayers] = useState<DetailsRes[]>([]);
  const { updateScreen, updatePlayer, updateMenu } = useScreenStore();

  useEffect(() => {
    async function getPlayerDetails() {
      const res = await playersApi.getAllPlayerDetails();
      setPlayers(res.data);
    }
    getPlayerDetails();
  }, []);

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

  function handleBack() {
    updateScreen('Welcome');
    updateMenu('Welcome');
  }

  return (
    <MenuPage title='Players' onBack={handleBack}>
      <div className='py-4'>
        <MenuList layout='grid'>
          {players.map((player) => (
            <MenuLink
              onClick={() => {
                updatePlayer(players[players.indexOf(player)]);
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
