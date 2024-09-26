import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Firebase authentication
import TicketItem from './TicketItem';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [uid, setUid] = useState(null);

    // Fetch the current user's UID from Firebase
    const getCurrentUser = () => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid);
        }
    };

    // Fetch tickets when the component loads
    useEffect(() => {
        getCurrentUser();  // Ensure current user is set
    }, []);  // Empty dependency to run only once on mount

    useEffect(() => {
        if (uid) {  // Ensure uid is set before fetching tickets
            fetch(`http://localhost:5000/api/tickets?uid=${uid}`)
                .then((response) => response.json())
                .then((data) => setTickets(data))
                .catch((error) => console.error('Error fetching tickets:', error));
        }
    }, [uid]);  // Run this effect when uid is set

    // Handle delete action
    const handleDelete = async (ticketId) => {
        try {
            await fetch(`http://localhost:5000/api/tickets/${ticketId}`, { method: 'DELETE' });
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <ul>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} onDelete={handleDelete} />
            ))}
        </ul>
    );
};

export default TicketList;
