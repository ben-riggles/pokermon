import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import MenuList from '../../lib/MenuList';

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
          <div>
            <div>Sixty Nines</div>
            <div>{player.six_nine}</div>
          </div>
          <div>
            <div>Quads</div>
            <div>{player.quads}</div>
          </div>
          <div>
            <div>Total Sessions</div>
            <div>{player.sessions.length}</div>
          </div>
          <div>
            <div>Cash Net</div>
            <div>${player.cash_net}</div>
          </div>
          <div>
            <div>Tourney Net</div>
            <div>${player.tournament_net}</div>
          </div>
          <div>
            <div>Misc Net</div>
            <div>${player.other_net}</div>
          </div>
          <div>
            <div>Total Net</div>
            <div>${player.total_net}</div>
          </div>
        </MenuList>
      </div>
    </MenuPage>
  );
}
