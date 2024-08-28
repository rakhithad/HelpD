// src/pages/ViewTicketsPage.jsx
import { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tickets');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handleDelete = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
            setTickets(tickets.filter(ticket => ticket._id !== ticketId)); // Update based on your data
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <div>
            <h2>View Tickets</h2>
            <TicketList tickets={tickets} onDelete={handleDelete} />
            <button type="button" onClick={() => navigate('/')}>Done</button>
        </div>
    );
};

export default ViewTicketsPage;
