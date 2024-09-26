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
        getCurrentUser();
        if (uid) {
            fetch(`http://localhost:5000/api/tickets?uid=${uid}`)  // Include UID in the request
                .then((response) => response.json())
                .then((data) => setTickets(data))
                .catch((error) => console.error('Error fetching tickets:', error));
        }
    }, [uid]);

    return (
        <ul>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </ul>
    );
};

export default TicketList;
