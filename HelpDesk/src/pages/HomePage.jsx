
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Help Desk System</h1>
            <nav>
                <ul>
                    <li><Link to="/create-ticket">Create Ticket</Link></li>
                    <li><Link to="/view-tickets">View Tickets</Link></li>
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                    <li><Link to="/engineer-dashboard">Support Engineer Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
