import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TicketItem = ({ ticket, onDelete, role }) => {
    const [assignedEngineer, setAssignedEngineer] = useState(ticket.assignedSupportEngineer);
    const [supportEngineers, setSupportEngineers] = useState([]);

    useEffect(() => {
        // Fetch all support engineers for admin to select from
        const fetchSupportEngineers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setSupportEngineers(response.data);
            } catch (error) {
                console.error('Error fetching support engineers:', error);
            }
        };

        if (role === 'admin') {
            fetchSupportEngineers();
        }
    }, [role]);

    const handleAssignEngineer = async (e) => {
        const supportEngineerId = e.target.value;
        setAssignedEngineer(supportEngineerId);

        try {
            await axios.put(`http://localhost:5000/api/tickets/${ticket._id}/assign`, { supportEngineerId });
        } catch (error) {
            console.error('Error assigning support engineer:', error);
        }
    };

    return (
        <div>
            <h3>{ticket.account}</h3>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>{ticket.status}</p>
            <p>{ticket.priority}</p>
            <p>Assigned Engineer: {assignedEngineer || 'Not Assigned'}</p>
            
            {role === 'admin' && (
                <select value={assignedEngineer} onChange={handleAssignEngineer}>
                    <option value="Not Assigned">Not Assigned</option>
                    {supportEngineers.map(engineer => (
                        <option key={engineer.uid} value={engineer.uid}>
                            {engineer.email}
                        </option>
                    ))}
                </select>
            )}
            
            <button onClick={() => onDelete(ticket._id)}>Delete</button>
        </div>
    );
};

// PropTypes validation
TicketItem.propTypes = {
    ticket: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        account: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
        assignedSupportEngineer: PropTypes.string, // This field is optional
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired, // role should be a string (admin, support_engineer, customer, etc.)
};

export default TicketItem;
