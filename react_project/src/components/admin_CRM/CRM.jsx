import React, { useEffect, useState } from 'react';
import useAPI, { METHOD } from '../../hooks/useAPI';
import './CRM.css';
import { useNavigate } from 'react-router-dom';

const CRM = ({ searchText }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [data, error, isLoading, apiCall] = useAPI();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [userToDelete, setUserToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successfulDelete, setSuccessDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiCall(METHOD.USERS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setUsers(data);
      setFilteredUsers(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchText) {
      const filtered = users.filter(user =>
        `${user.name.first} ${user.name.middle} ${user.name.last} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
    setCurrentPage(1);
  }, [searchText, users]);

  const handleStatusChange = async (userId) => {
    console.log(`Updating status for user with ID: ${userId}`);
    await apiCall(METHOD.USER_UPDATE_STATUS, { id: userId });
    // Refresh the users list after status change
    apiCall(METHOD.USERS_GET_ALL);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      console.log(`Deleting user with ID: ${userToDelete._id}`);
      await apiCall(METHOD.USER_DELETE, { id: userToDelete._id });
      setSuccessDelete(true);
      setTimeout(() => {
        setSuccessDelete(false);
        navigate('/CRM');
      }, 2000);
      // Refresh the users list after deletion
      apiCall(METHOD.USERS_GET_ALL);
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  const confirmDeleteUser = (user) => {
    console.log(`Confirm delete user: ${user.name.first} ${user.name.last} (${user.email})`);
    setUserToDelete(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
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
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th style={{ width: '22vw' }}>Name</th>
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
                <td className='table_button'>
                  <button className="my_button primary" onClick={() => handleStatusChange(user._id)}>
                    {user.isBusiness ? 'Set Regular' : 'Set Business'}
                  </button>
                  {!user.isAdmin && (
                    <button className="my_button secondary" onClick={() => confirmDeleteUser(user)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
      {showModal && (
        <div className="my_modal">
          <div className="my_modal-content">
            <h4>Are you sure you want to delete user:</h4>
            <p>{userToDelete && `${userToDelete.name.first} ${userToDelete.name.last} (${userToDelete.email})`}</p>
            <button onClick={handleDeleteUser} className="my_button secondary">Delete</button>
            <button onClick={closeModal} className="my_button primary">Back</button>
          </div>
        </div>
      )}
      {successfulDelete && (
        <div className="successfulMess">
          User deleted successfully.
        </div>
      )}
    </div>
  );
};

export default CRM;
