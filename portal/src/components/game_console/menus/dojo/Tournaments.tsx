import useScreenStore from '@/stores/screenStore';
import MenuPage from '../../lib/MenuPage';
import useTournaments from '@/api/useTournaments';
import format from 'date-fns/format';
import MenuLink from '../../lib/MenuLink';
import MenuList from '../../lib/MenuList';

export default function Tournaments() {
  const { updateMenu, updateTournamentId } = useScreenStore();
  const { data: tournaments, isError, isLoading } = useTournaments();

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('Dojo Menu');
  }

  return (
    <MenuPage title='Past Tournaments' onBack={handleBack}>
      <MenuList>
        {tournaments.map((tournament) => {
          return (
            <div key={tournament.session_id}>
              <MenuLink
                onClick={() => {
                  updateTournamentId(tournament.session_id);
                  updateMenu('Single Tournament');
                }}
              >
                {format(new Date(Date.parse(tournament.date)), 'MM/dd/yyyy')}
              </MenuLink>
            </div>
          );
        })}
      </MenuList>
    </MenuPage>
  );
}
