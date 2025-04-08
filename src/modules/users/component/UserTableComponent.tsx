import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { UserListType } from "../IndexUsersTypes";
import Loader from "../../../components/Loader";
import { API_STATUS_TYPE } from "../../../utils/globalTypes";

const UserTableComponent = () => {
  const navigate = useNavigate();

  // Get filtered user list from Redux store
  const userList = useSelector((state: RootState) => state.userList.filteredList);

  // Get API status from Redux store
  const userListStatus = useSelector((state: RootState) => state.userList.status);

  // Navigate to user details page
  const handleNavigateDetailsPage = (id: number) => {
    navigate(`/user/${id}`);
  };

  // Show loader while data is being fetched
  if (userListStatus === API_STATUS_TYPE.PENDING) {
    return <Loader />;
  }

  // Show message if no users are found
  if (!userList || userList.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        {/* Table Head */}
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Company</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {userList.map((user: UserListType) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleNavigateDetailsPage(user.id)}
            >
              <td className="px-4 py-2 text-left text-sm text-gray-700">{user.id}</td>
              <td className="px-4 py-2 text-left text-sm font-medium text-gray-800">
                {user.name}
              </td>
              <td className="px-4 py-2 text-left text-sm text-gray-600">{user.email}</td>
              <td className="px-4 py-2 text-left text-sm text-gray-600">
                {user.company.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableComponent;
