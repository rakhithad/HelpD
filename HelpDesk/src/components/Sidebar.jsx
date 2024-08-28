
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create-ticket">Create Ticket</Link></li>
                    <li><Link to="/view-tickets">View Tickets</Link></li>
                    {/* Add more links for different pages */}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
