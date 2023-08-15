import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import { PlayersRes } from '@/types/endpoints/players';
import { FormEvent, useState } from 'react';
import usePlayers from '@/api/usePlayers';
import FormInput from '@/components/ui/menus_common/FormInput';
import PlayerSelect from '@/components/ui/menus_common/PlayerSelect';

export default function Payouts() {
  const { updateMenu } = useScreenStore();
  const { data: players, isError, isLoading } = usePlayers();
  const [payout, setPayout] = useState('0');
  const [selectedPerson, setSelectedPerson] = useState<PlayersRes>({
    id: 0,
    first_name: '',
    last_name: '',
    sprite: 'snorlax',
  });

  function handleBack() {
    updateMenu('Poker Mart Menu');
  }

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  const shownPlayer = players.find((player) => selectedPerson.id === player.id);

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle Cash Game logic
  }

  return (
    <MenuPage title='Payouts' onBack={handleBack}>
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
                src={`https://img.pokemondb.net/sprites/black-white/normal/${
                  shownPlayer.sprite || 'snorlax'
                }.png`}
              />
              <span className='text-xs text-left'>
                {shownPlayer.first_name} {shownPlayer.last_name}
              </span>
            </div>
            <form onSubmit={submitForm} className='flex flex-col w-52 gap-4'>
              <FormInput
                label='Cash Game'
                value={payout}
                handleFn={setPayout}
                placeholder={payout}
              />
              <button className='pixel-border hover:bg-sky-100' type='submit'>
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </MenuPage>
  );
}
