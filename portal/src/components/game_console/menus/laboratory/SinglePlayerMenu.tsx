import usePreviousMenu from '@/hooks/usePreviousMenu';
import useScreenStore from '@/stores/screenStore';

export default function SinglePlayerMenu() {
  const { player, updateMenu } = useScreenStore();
  usePreviousMenu('All Players');

  const sprite = player.sprite || 'snorlax';

  return (
    <div className='flex flex-col text-xs p-2'>
      <div className='flex items-end h-8 mt-4 pb-4'>
        <div className='flex h-12'>
          <img
            src={`https://img.pokemondb.net/sprites/black-white/normal/${sprite}.png`}
          />
        </div>
        <span className='text-lg'>
          {player.first_name} {player.last_name}
        </span>
      </div>
      <div>Sixty Nines</div>
      <div>{player.six_nine}</div>
      <div>Quads</div>
      <div>{player.quads}</div>
      <div>Total Sessions</div>
      <div>{player.sessions.length}</div>
      <div>Cash Net</div>
      <div>${player.cash_net}</div>
      <div>Tourney Net</div>
      <div>${player.tournament_net}</div>
      <div>Misc Net</div>
      <div>${player.other_net}</div>
      <div>Total Net</div>
      <div>${player.total_net}</div>
      <div
        className='cursor-pointer text-lg pt-4'
        onClick={() => updateMenu('All Players')}
      >
        Back
      </div>
    </div>
  );
}
