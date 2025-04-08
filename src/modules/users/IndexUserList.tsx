import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/slice/userListSlice"; 
import UserTableComponent from "./component/UserTableComponent";
import UserTableActionBar from "./component/UserTableActionBar";

const IndexUserList = () => {
  const dispatch = useAppDispatch();

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); 

  return (
    <div className="p-4">
      {/* Action Bar for Filtering */}
      <UserTableActionBar />

      {/* Table Component to Display User Data */}
      <UserTableComponent />
    </div>
  );
};

export default IndexUserList;
