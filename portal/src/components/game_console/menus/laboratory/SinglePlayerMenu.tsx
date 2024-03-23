import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';
import MenuList from '@/components/game_console/lib/MenuList';
import usePlayerDetails from '@/api/usePlayerDetails';
import InfoCard from '@/components/ui/InfoCard';

export const currency = (value: number, decimals = 2) =>
  value >= 0
    ? `$${value.toFixed(decimals)}`
    : `-$${Math.abs(value).toFixed(decimals)}`;

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
          <InfoCard info={player.six_nine} title='Sixty Nines' />
          <InfoCard info={player.quads} title='Quads' />
          <InfoCard
            info={player.attendance.toFixed(2) + ' %'}
            title='Attendance'
          />
          <InfoCard info={currency(player.cash_net)} title='Cash Net' />
          <InfoCard
            info={currency(player.tournament_net)}
            title='Tourney Net'
          />
          <InfoCard info={currency(player.other_net)} title='Misc Net' />
          <InfoCard info={currency(player.total_net)} title='Total Net' />
        </MenuList>
      </div>
    </MenuPage>
  );
}
