import React from "react";
import { IUser } from "../../shared/models/usersList";
import EmptyData from "../EmptyData";
import UserCard from "./UserCard";
import "./usersList.css";

interface UserListProps {
  users: IUser[];
  isLoading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading }) => {
  return (
    <>
      {!isLoading && users.length ? (
        <div className="cards-container">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))}
        </div>
      ) : (
        <EmptyData
          data={users}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default UserList;
