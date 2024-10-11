import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase'; // Firebase auth
import TicketItem from '../components/TicketItem'; // Import the TicketItem component
import { useNavigate } from 'react-router-dom';

const SupportEngineerPage = () => {
    const [tickets, setTickets] = useState([]);
    const [uid, setUid] = useState(null);
    const navigate = useNavigate();

    // Set UID after the user is authenticated
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid); // Set the user's UID
        }
    }, []);

    // Fetch tickets only when UID is available
    useEffect(() => {
        const fetchAssignedTickets = async () => {
            console.log("UID in frontend:", uid);
            if (uid) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/tickets/?uid=${uid}`);
                    setTickets(response.data);
                } catch (error) {
                    console.error('Error fetching assigned tickets:', error);
                }
            }
        };

        fetchAssignedTickets();
    }, [uid]); // Only run when `uid` changes

    // Function to handle ticket updates
    const handleUpdateTicket = (updatedTicket) => {
        setTickets(prevTickets =>
            prevTickets.map(ticket => (ticket._id === updatedTicket._id ? updatedTicket : ticket))
        );
    };

    // Function to handle ticket deletion
    const handleDeleteTicket = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <div>
            <h1>Your Assigned Tickets</h1>
            {tickets.length > 0 ? (
                tickets.map(ticket => (
                    <TicketItem
                        key={ticket._id}
                        ticket={ticket}
                        onDelete={handleDeleteTicket}
                        onUpdate={handleUpdateTicket}
                        role="support_engineer" // Set the role to 'support_engineer' for this page
                    />
                ))
            ) : (
                <p>No tickets assigned to you</p>
                
            )}
            <button type="button" onClick={() => navigate('/')}>Done</button>
        </div>
    );
};

export default SupportEngineerPage;
