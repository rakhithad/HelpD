import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TicketItem = ({ ticket, onDelete, onUpdate, role }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTicket, setUpdatedTicket] = useState({
        account: ticket.account,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
    });
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
            const response = await axios.put(`http://localhost:5000/api/tickets/${ticket._id}/assign`, { supportEngineerId });
            onUpdate(response.data); // Update the ticket in parent state
        } catch (error) {
            console.error('Error assigning support engineer:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTicket({ ...updatedTicket, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`, updatedTicket);
            console.log('Ticket updated:', response.data);
            setIsEditing(false); // Close the form after updating
            onUpdate(response.data); // Update the ticket in parent state
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="account"
                        value={updatedTicket.account}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        value={updatedTicket.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        value={updatedTicket.description}
                        onChange={handleChange}
                    />
                    <select
                        name="status"
                        value={updatedTicket.status}
                        onChange={handleChange}
                    >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="stuck">Stuck</option>
                        <option value="done">Done</option>
                    </select>
                    <input
                        type="number"
                        name="priority"
                        value={updatedTicket.priority}
                        onChange={handleChange}
                        min="1"
                        max="5"
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{ticket.account}</h3>
                    <h2>{ticket.title}</h2>
                    <p>{ticket.description}</p>
                    <p>Status: {ticket.status}</p>
                    <p>Priority: {ticket.priority}</p>
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

                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(ticket._id)}>Delete</button>
                </div>
            )}
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
    onUpdate: PropTypes.func.isRequired, // Added onUpdate prop validation
    role: PropTypes.string.isRequired,
};

export default TicketItem;
