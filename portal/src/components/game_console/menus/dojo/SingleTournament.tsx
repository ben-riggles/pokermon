import useScreenStore from '@/stores/screenStore';
import useSingleTournament from '@/api/useSingleTournament';
import InfoCard from '@/components/ui/InfoCard';
import { currency } from '../laboratory/SinglePlayerMenu';
import MenuList from '../../lib/MenuList';
import { format } from 'date-fns';
import MenuLink from '../../lib/MenuLink';
import MenuPage from '../../lib/MenuPage';

export default function SingleTournament() {
  const { updateMenu, tournamentId } = useScreenStore();
  const {
    data: tournament,
    isError,
    isLoading,
  } = useSingleTournament(tournamentId);

  if (isError) {
    return <MenuPage title='An Error Occurred' onBack={handleBack}></MenuPage>;
  }
  if (isLoading) {
    return <MenuPage title='...Loading' onBack={handleBack}></MenuPage>;
  }

  function handleBack() {
    updateMenu('Tournaments');
  }

  const newThing = tournament.prizes
    .map((prize) => currency(prize, 0))
    .join(' | ');
  return (
    <MenuPage title='Tournament' onBack={handleBack}>
      <InfoCard
        info={format(new Date(Date.parse(tournament.date)), 'MMM : do : yyyy')}
        title='Date'
      />
      <InfoCard info={currency(tournament.buy_in)} title='Buy In' />
      <InfoCard info={tournament.num_paid} title='Players Paid' />
      <InfoCard info={tournament.num_players} title='Total Players' />
      <InfoCard info={newThing} title='Payouts' />
      <MenuList>
        <MenuLink onClick={() => updateMenu('Tournament Placements')}>
          See Placements
        </MenuLink>
      </MenuList>
    </MenuPage>
  );
}
