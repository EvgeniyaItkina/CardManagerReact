import React, { useEffect, useState } from 'react';
import useAPI, { METHOD } from '../../hooks/useAPI';
import './CRM.css';

const CRM = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [data, error, isLoading, apiCall] = useAPI();

  useEffect(() => {
    apiCall(METHOD.USERS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("Unexpected data format:", data);
    }
  }, [data]);

  const handleStatusChange = async (userId) => {
    console.log(`Updating status for user with ID: ${userId}`);
    await apiCall(METHOD.USER_UPDATE_STATUS, { id: userId });
    // Refresh the users list after status change
    apiCall(METHOD.USERS_GET_ALL);
  };

  const handleDeleteUser = async (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
    await apiCall(METHOD.USER_DELETE, { id: userId });
    // Refresh the users list after deletion
    apiCall(METHOD.USERS_GET_ALL);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const pageNumbersToShow = 5;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= pageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 1) {
        pageNumbers.push(
          <button key="first" onClick={() => setCurrentPage(1)} className="page-number">
            First
          </button>
        );
      }

      let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
      let endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

      if (endPage - startPage < pageNumbersToShow - 1) {
        startPage = Math.max(1, endPage - pageNumbersToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages) {
        pageNumbers.push(
          <button key="last" onClick={() => setCurrentPage(totalPages)} className="page-number">
            Last
          </button>
        );
      }
    }

    return pageNumbers;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="crm-container">
      <h2>CRM System</h2>
      <table className="crm-table">
        <thead>
          <tr>
            <th style={{ width: '25vw' }}>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td>{`${user.name.first} ${user.name.middle} ${user.name.last}`}</td>
              <td>{user.email}</td>
              <td>{user.isBusiness ? 'Business' : 'Regular'}</td>
              <td>
                <button onClick={() => handleStatusChange(user._id)}>
                  {user.isBusiness ? 'Set Regular' : 'Set Business'}
                </button>
                {!user.isAdmin && (
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default CRM;
