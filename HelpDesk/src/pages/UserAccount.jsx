import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase'; // Firebase auth
import { useNavigate } from 'react-router-dom';

const UserAccount = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: ''
    });
    const [uid, setUid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
    const navigate = useNavigate();

    // Set UID after the user is authenticated
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid); // Set the user's UID
        }
    }, []);

    // Fetch user details using UID
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (uid) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
                    setUserData(response.data);
                    setIsLoading(false);
                } catch (error) {
                    setError('Failed to fetch user details.', error);
                    setIsLoading(false);
                }
            }
        };
        fetchUserDetails();
    }, [uid]);

    // Handle input changes for editable fields
    const handleInputChange = (field, value) => {
        setUserData({
            ...userData,
            [field]: value
        });
    };

    // Save changes
    const handleSaveClick = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/${uid}`, userData);
            alert('User details updated successfully!');
            setIsEditing(false); // Exit editing mode after saving
        } catch (error) {
            console.error('Error updating user details:', error);
            setError('Failed to update user details.');
        }
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle 'Done' button click to navigate to a different page
    const handleDoneClick = () => {
        navigate('/'); // Change to the desired page
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Your Account Details</h1>
            {isEditing ? (
                // Editable form fields in "Edit Mode"
                <form>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={userData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={userData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={userData.email}
                            disabled // Email might not be editable
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={userData.phoneNumber || ''}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Location:</label>
                        <input
                            type="text"
                            value={userData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleSaveClick}>Save</button>
                </form>
            ) : (
                // View mode: Display user data as text
                <div>
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber || 'N/A'}</p>
                    <p><strong>Location:</strong> {userData.location || 'N/A'}</p>
                    <button type="button" onClick={handleEditClick}>Edit</button>
                </div>
            )}
            <button type="button" onClick={handleDoneClick}>Done</button>
        </div>
    );
};

export default UserAccount;
