import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/view-tickets" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Tickets
                        </Link>
                    </li>
                    <li>
                        <Link to="/reviews" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Reviews
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
