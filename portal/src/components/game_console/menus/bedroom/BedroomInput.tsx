import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import usePlayers from '@/api/usePlayers';
import { FormEvent, useState } from 'react';
import { PlayersRes } from '@/types/endpoints/players';
import { pokemonNames } from '@/misc_data/pokemonNames';
import { usePutPlayer } from '@/api/usePlayerDetails';
import PlayerSelect from '@/components/ui/menus_common/PlayerSelect';
import FormInput from '@/components/ui/menus_common/FormInput';

export default function BedroomInput() {
  const { updateMenu } = useScreenStore();
  const { data: players, isError, isLoading } = usePlayers();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [sprite, setSprite] = useState('');
  const [err, setErr] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<PlayersRes>({
    id: 0,
    first_name: '',
    last_name: '',
    sprite: 'snorlax',
  });
  const { mutate: putPlayer } = usePutPlayer(selectedPerson);

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('Bedroom Menu');
  }

  function handleSprite(value: string) {
    setSprite(value.toLowerCase());
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pokemonNames.includes(sprite)) {
      putPlayer({
        first_name: first,
        last_name: last,
        sprite: sprite,
      });
      setErr('');
    } else {
      setErr('Sprite not included in DB!');
    }
  }

  const shownPlayer = players.find((player) => selectedPerson.id === player.id);

  return (
    <MenuPage title='Input Your Info' onBack={handleBack}>
      <div className='flex flex-col items-center w-full pixel-border p-4'>
        <PlayerSelect
          players={players}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
        {shownPlayer?.id && (
          <div className='flex flex-col items-center'>
            <div className='flex h-20 w-52 items-center'>
              <img
                className='h-20 min-w-[48px]'
                src={`http://img.pokemondb.net/sprites/black-white/normal/${
                  shownPlayer.sprite || 'snorlax'
                }.png`}
              />
              <span className='text-xs text-left'>
                {shownPlayer.first_name} {shownPlayer.last_name}
              </span>
            </div>
            <form onSubmit={submitForm} className='flex flex-col w-52 gap-4'>
              <FormInput
                label='First Name'
                value={first}
                handleFn={setFirst}
                placeholder={shownPlayer.first_name}
              />
              <FormInput
                label='Last Name'
                value={last}
                handleFn={setLast}
                placeholder={shownPlayer.last_name}
              />
              <FormInput
                label='Sprite'
                value={sprite}
                handleFn={handleSprite}
                placeholder={shownPlayer.sprite}
                err={err}
              />
              {err && <span>{err}</span>}
              <button className='pixel-border hover:bg-sky-100' type='submit'>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </MenuPage>
  );
}
