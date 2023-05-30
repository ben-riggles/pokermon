import { fetchPlayer } from '@/api/fetchPlayer';
import usePreviousScreen from '@/hooks/usePreviousScreen';
import useScreenStore from '@/stores/screenStore';

export default function SinglePlayerScreen() {
  const { player, updateScreen } = useScreenStore();
  usePreviousScreen('Players');
  fetchPlayer();

  return (
    <div className='flex flex-col text-xs p-2'>
      <div className='flex items-end h-8 mt-4 pb-4'>
        <div className='flex h-12'>
          <img src={player.sprite} />
        </div>
        <span>{player.name} </span>
      </div>
      <div>Sixty Nines</div>
      <div>{player.sixNine}</div>
      <div>Quads</div>
      <div>{player.quads}</div>
      <div>StraightFlushes</div>
      <div>{player.straightFlush}</div>
      <div>Placements</div>
      <div>{player.tourneyPlacements}</div>
      <div>Highest Cash Win</div>
      <div>{player.biggestCash}</div>
      <div className='cursor-pointer' onClick={() => updateScreen('Players')}>
        Back
      </div>
    </div>
  );
}
