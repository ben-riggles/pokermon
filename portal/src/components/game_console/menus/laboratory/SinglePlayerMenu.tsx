import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';
import usePlayerDetails from '@/api/usePlayerDetails';

export const currency = (value: number) =>
  value >= 0 ? (
    <>{`$${value.toFixed(2)}`}</>
  ) : (
    <>{`-$${Math.abs(value).toFixed(2)}`}</>
  );

export default function SinglePlayerMenu() {
  const { playerId, updateMenu } = useScreenStore();
  const { data: player, isLoading, isError } = usePlayerDetails(playerId);
  usePreviousMenu('All Players');

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('All Players');
  }

  const sprite = player.sprite || 'snorlax';

  return (
    <MenuPage
      title={
        <div className='flex items-center'>
          <div className='flex h-12'>
            <img
              src={`https://img.pokemondb.net/sprites/black-white/normal/${sprite}.png`}
            />
          </div>
          <span>
            {player.first_name} {player.last_name}
          </span>
        </div>
      }
      onBack={() => updateMenu('All Players')}
    >
      <div className='text-sm'>
        <MenuList withCursor={false} layout='grid'>
          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{player.six_nine}</div>
            <div>Sixty Nines</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{player.quads}</div>
            <div>Quads</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{player.id}</div>
            <div>Total Sessions</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{currency(player.cash_net)}</div>
            <div>Cash Net</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{currency(player.tournament_net)}</div>
            <div>Tourney Net</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{currency(player.other_net)}</div>
            <div>Misc Net</div>
          </div>

          <div className='text-center w-full pixel-border p-4'>
            <div className='text-xl'>{currency(player.total_net)}</div>
            <div>Total Net</div>
          </div>
        </MenuList>
      </div>
    </MenuPage>
  );
}
