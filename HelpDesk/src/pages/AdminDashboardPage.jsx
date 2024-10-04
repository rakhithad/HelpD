import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        
        navigate('/signup');
    };

    const handleDoneClick = () => {
        // Navigate to the home page
        navigate('/');
    };


    const ManageUsersClick = () => {
        // Navigate to the home page
        navigate('/manage-users');
    };
    
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleSignUpClick}>Go to Sign Up</button>
            <button onClick={handleDoneClick}>Done</button>
            <button onClick={ManageUsersClick}>Manage Users</button>
        </div>
    );
};

export default AdminDashboardPage;
