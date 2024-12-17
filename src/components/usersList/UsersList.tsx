// src/components/UserList/UserList.tsx
import React from 'react';
import { IUser } from '../../shared/models/usersList';
import EmptyData from '../EmptyData';
import UserTable from './UserTable';

interface UserListProps {
  users: IUser[];
  isLoading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading }) => {
  return (
    <section>
     {!isLoading && users.length ? (
        <UserTable users={users} />
      ) : (
        <EmptyData data={users} isLoading={isLoading} />
      )}
  </section>
  
  );
};

export default UserList;
