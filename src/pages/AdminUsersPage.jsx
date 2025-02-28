import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('Access denied');
      window.location.href = '/';
    }

    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [user]);

  const handleRoleChange = async (id, role) => {
    await fetch(`/api/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <div>
      <h1>Admin Users Management</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} - {u.role}
            <button onClick={() => handleRoleChange(u.id, 'admin')}>Make Admin</button>
            <button onClick={() => handleRoleChange(u.id, 'user')}>Make User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;