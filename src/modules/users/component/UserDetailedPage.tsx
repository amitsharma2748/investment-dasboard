import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";
import { fetchUser } from "../../../redux/slice/userDetailSlice";
import Loader from "../../../components/Loader";
import { API_STATUS_TYPE } from "../../../utils/globalTypes";

const UserDetailedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Get user details & status from Redux store
  const userDetails = useSelector((state: RootState) => state.userDetail.userData);
  const userDetailsStatus = useSelector((state: RootState) => state.userDetail.status);

  // Fetch user details when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(Number(userId)));
    }
  }, [dispatch, userId]);

  // Show loader while data is being fetched
  if (userDetailsStatus === API_STATUS_TYPE.PENDING) {
    return <Loader />;
  }

  // Handle case when user details are missing
  if (!userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">No user found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        
        {/* User Details */}
        <div>
          {/* Name & Basic Info */}
          <h2 className="text-2xl font-semibold text-gray-800">{userDetails.name}</h2>
          <p className="text-gray-600">@{userDetails.username}</p>
          <p className="text-gray-600">{userDetails.email}</p>

          {/* Address Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600">
              {userDetails.address.street}, {userDetails.address.suite}
            </p>
            <p className="text-gray-600">
              {userDetails.address.city}, {userDetails.address.zipcode}
            </p>
          </div>

          {/* Company Details */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Company</h3>
            <p className="text-gray-600 font-medium">{userDetails.company.name}</p>
            <p className="text-gray-600 italic">"{userDetails.company.catchPhrase}"</p>
          </div>

          {/* Contact Info */}
          <div className="mt-4">
            <p className="text-gray-600">📞 {userDetails.phone}</p>
            <p className="text-gray-600">
              🌐{" "}
              <a
                href={`https://${userDetails.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {userDetails.website}
              </a>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetailedPage;
