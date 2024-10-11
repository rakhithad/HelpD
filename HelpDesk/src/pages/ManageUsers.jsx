import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ManageUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data); // Set users in state
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users.');
            }
        };
        
        fetchUsers();
    }, []);

    // Handle user data updates (save changes)
    const handleSaveClick = async (uid) => {
        try {
            const updatedUser = users.find(user => user.uid === uid);

            await axios.put(`http://localhost:5000/api/users/${uid}`, updatedUser); // Send updated data to the backend
            setEditUser(null); // Exit editing mode
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user.');
        }
    };
    // Handle input changes for editable fields
    const handleInputChange = (uid, field, value) => {
        setUsers(users.map(user => 
            user.uid === uid ? { ...user, [field]: value } : user
        ));
    };
    const handleEditClick = (uid) => {
        setEditUser(uid); // Set the current user being edited
    };

    const handleCancelClick = () => {
        setEditUser(null); // Exit editing mode without saving
    };


    const handleDoneClick = () => {
        // Navigate to the home page
        navigate('/admin-dashboard');
    };

    // Handle deleting a user
    const handleDeleteClick = async (uid) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${uid}`);
            setUsers(users.filter(user => user.uid !== uid)); // Remove the user from the state
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user.');
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            {error && <p>{error}</p>}
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.uid}>
                                <td>{user.uid}</td>
                                <td>
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.firstName}
                                            onChange={(e) => handleInputChange(user.uid, 'firstName', e.target.value)}
                                        />
                                    ) : (
                                        user.firstName
                                    )}
                                </td>
                                <td>
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.lastName}
                                            onChange={(e) => handleInputChange(user.uid, 'lastName', e.target.value)}
                                        />
                                    ) : (
                                        user.lastName
                                    )}
                                </td>

                                <td>
                                    {
                                        user.email
                                    }
                                </td>
                                <td>
                                    {
                                        user.role
                                    }
                                </td>
                                <td>
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.phoneNumber || ''}
                                            onChange={(e) => handleInputChange(user.uid, 'phoneNumber', e.target.value)}
                                        />
                                    ) : (
                                        user.phoneNumber || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.location || ''}
                                            onChange={(e) => handleInputChange(user.uid, 'location', e.target.value)}
                                        />
                                    ) : (
                                        user.location || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editUser === user.uid ? (
                                        <>
                                            <button onClick={() => handleSaveClick(user.uid)}>Save</button>
                                            <button onClick={handleCancelClick}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(user.uid)}>Edit</button>
                                            <button onClick={() => handleDeleteClick(user.uid)}>Delete</button> 
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users to display.</p>
            )}
            <button onClick={handleDoneClick}>Done</button>
        </div>
    );
};

export default ManageUsers;
