// src/components/UserList/UserList.tsx
import React from "react";
import EmptyData from "../EmptyData";
import UserTable from "./UserTable";
import "./UserTable.css";

interface UsersProfiles {
  users: any[];
  isLoading: boolean;
}

const UsersProfiles: React.FC<UsersProfiles> = ({ users, isLoading }) => {
  return (
    <>
      {!isLoading && users?.length ? (
        <UserTable users={users} />
      ) : (
        <EmptyData
          data={users}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default UsersProfiles;
