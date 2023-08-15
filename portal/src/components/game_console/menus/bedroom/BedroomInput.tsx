import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import BedroomPlayerSelect from './BedroomPlayerSelect';
import usePlayers from '@/api/usePlayers';
import { FormEvent, useState } from 'react';
import { PlayersRes } from '@/types/endpoints/players';
import BedroomFormInput from './BedroomFormInput';
import { pokemonNames } from '@/misc_data/pokemonNames';
import { usePutPlayer } from '@/api/usePlayerDetails';

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
        <BedroomPlayerSelect
          players={players}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
        {shownPlayer?.id && (
          <div className='flex flex-col items-center'>
            <div className='flex h-20 w-52 items-center'>
              <img
                className='h-20 min-w-[48px]'
                src={`https://img.pokemondb.net/sprites/black-white/normal/${
                  shownPlayer.sprite || 'snorlax'
                }.png`}
              />
              <span className='text-xs text-left'>
                {shownPlayer.first_name} {shownPlayer.last_name}
              </span>
            </div>
            <form onSubmit={submitForm} className='flex flex-col w-52 gap-4'>
              <BedroomFormInput
                label='First Name'
                value={first}
                handleFn={setFirst}
                placeholder={shownPlayer.first_name}
              />
              <BedroomFormInput
                label='Last Name'
                value={last}
                handleFn={setLast}
                placeholder={shownPlayer.last_name}
              />
              <BedroomFormInput
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
