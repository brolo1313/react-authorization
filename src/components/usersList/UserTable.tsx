// src/components/UserList/UserTable.tsx
import React from 'react';
import { IUser } from '../../shared/models/usersList';

interface UserTableProps {
  users: IUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="user-table">
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '40%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
