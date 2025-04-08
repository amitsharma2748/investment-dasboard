import  { useEffect, useState } from "react";
import { headerOptions, TABLE_HEADER } from "../IndexUsersTypes";
import { useSelector } from "react-redux"; 
import { RootState, useAppDispatch } from "../../../redux/store";
import { updateFilteredList } from "../../../redux/slice/userListSlice";

const UserTableActionBar = () => {
    const dispatch=useAppDispatch()
  const [selectedColumn, setSelectedColumn] = useState<TABLE_HEADER>(TABLE_HEADER.NAME);
  const [searchQuery, setSearchQuery] = useState("");
  const userList=useSelector((state:RootState)=>(state.userList.resData))

  useEffect(() => {
    if (!userList) return;

    let filteredArr = userList;

    switch (selectedColumn) {
      case TABLE_HEADER.NAME:
        filteredArr = userList.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case TABLE_HEADER.EMAIL:
        filteredArr = userList.filter((user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case TABLE_HEADER.ID:
        filteredArr = userList.filter((user) =>
          user.id.toString().includes(searchQuery)
        );
        break;
      case TABLE_HEADER.COMPANY:
        filteredArr = userList.filter((user:any) =>
          user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      default:
        filteredArr = userList; // Show all users if no match
    }

    dispatch(updateFilteredList(filteredArr));
  }, [searchQuery, selectedColumn, userList, dispatch]); // ✅ Fixed dependency array


  return (
    <div className="flex justify-end items-center gap-4 p-4 bg-gray-100 rounded-md">
      {/* Dropdown for selecting column */}
      <select
        className="px-1 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value as TABLE_HEADER)}
      >
        {headerOptions.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      {/* Input for search */}
      <input
        type="text"
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        placeholder={`Search by ${selectedColumn}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default UserTableActionBar;
