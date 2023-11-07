import FriendsInvitationCard from '../../../components/FriendsInvitationCard';
import { useFriendsContext } from '../../../hooks/useFriendsContext';

function IncomingFriendsRequestsList({ incomingRequestsArray }) {
  const { incoming } = useFriendsContext();

  return (
    <div className='space-y-3'>
      {incoming?.map((invitation, key) => (
        <FriendsInvitationCard key={key} item={invitation} />
      ))}
    </div>
  );
}
export default IncomingFriendsRequestsList;
