import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';
import MenuProgressBar from '../../lib/MenuProgressBar';

const Currency = (value: number) =>
  value > 0 ? <>{`$${value}`}</> : <>{`-$${Math.abs(value)}`}</>;

export default function SinglePlayerMenu() {
  const { player, updateMenu } = useScreenStore();
  usePreviousMenu('All Players');

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
      <div className='text-sm py-2'>
        <MenuList withCursor={false} itemGap='1'>
          <MenuProgressBar
            title='Sixty Nines'
            current={player.six_nine}
            max={100}
          />
          <MenuProgressBar title='Quads' current={player.quads} max={100} />
          <MenuProgressBar
            title='Total Sessions'
            current={player.sessions.length}
            max={100}
          />
          <MenuProgressBar
            title='Cash Net'
            current={player.cash_net}
            min={-250}
            max={250}
            valueRenderer={Currency}
          />
          <MenuProgressBar
            title='Tourney Net'
            current={player.tournament_net}
            min={-250}
            max={250}
            valueRenderer={Currency}
          />
          <MenuProgressBar
            title='Misc Net'
            current={player.other_net}
            min={-250}
            max={250}
            valueRenderer={Currency}
          />
          <MenuProgressBar
            title='Total Net'
            current={player.total_net}
            min={-250}
            max={250}
            valueRenderer={Currency}
          />
        </MenuList>
      </div>
    </MenuPage>
  );
}
