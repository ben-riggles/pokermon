import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';

export const currency = (value: number) =>
  value >= 0 ? (
    <>{`$${value.toFixed(2)}`}</>
  ) : (
    <>{`-$${Math.abs(value).toFixed(2)}`}</>
  );

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
            <div className='text-xl'>{player.sessions.length}</div>
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

          {/* <MenuProgressBar
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
          /> */}
        </MenuList>
      </div>
    </MenuPage>
  );
}
