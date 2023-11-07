import SearchUserCard from './SearchUserCard';
function SearchUsersList({ users }) {
  return (
    <div className='w-full flex flex-col space-y-4'>
      {users.map((user, _) => (
        <SearchUserCard user={user} key={user?._id} />
      ))}
    </div>
  );
}
export default SearchUsersList;
