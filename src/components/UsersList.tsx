// src/components/UserList/UserList.tsx
import React from 'react';
import { IUser } from '../shared/models/usersList';
import EmptyData from './EmptyData';

interface UserListProps {
  users: IUser[];
  isLoading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading }) => {
  return (
    <section>
      {!isLoading && users.length ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyData data={users}  isLoading={isLoading}/>
      )}
    </section>
  );
};

export default UserList;
