import usePlayers from '@/api/usePlayers';
import useSingleTournament from '@/api/useSingleTournament';
import format from 'date-fns/format';
import useScreenStore from '@/stores/screenStore';
import MenuPage from '@/components/game_console/lib/MenuPage';

export default function SingleTournamentPlacements() {
  const { updateMenu, tournamentId } = useScreenStore();
  const {
    data: players,
    isLoading: playersLoading,
    isError: playersError,
  } = usePlayers();
  const {
    data: tournament,
    isLoading: tournamentLoading,
    isError: tournamentError,
  } = useSingleTournament(tournamentId);

  if (playersError || tournamentError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (tournamentLoading || playersLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('Tournaments');
  }

  const placements = tournament.placements.map((placement) => {
    return players[placement];
  });

  return (
    <MenuPage
      title={format(new Date(Date.parse(tournament.date)), 'MM/dd/yyyy')}
      onBack={handleBack}
    >
      {placements.map((player, i) => {
        return (
          <div key={player.id} className='flex h-8 items-center'>
            <span className='text-xs text-left'>{i + 1}.</span>
            <img
              className='h-12 min-w-[48px]'
              src={`http://img.pokemondb.net/sprites/black-white/normal/${
                player.sprite || 'snorlax'
              }.png`}
            />
            <span className='text-xs text-left'>
              {player.first_name} {player.last_name}
            </span>
          </div>
        );
      })}
    </MenuPage>
  );
}
