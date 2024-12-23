import React from 'react';

interface UserTableProps {
  users: any[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="user-table">
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '40%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.title}</td>
            <td>{user.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
