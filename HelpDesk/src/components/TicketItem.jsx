
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TicketItem = ({ ticket, onDelete }) => {
    return (
        <div className="ticket-item">
            <Link to={`/tickets/${ticket._id}/edit`}>
                <h3>{ticket.title}</h3>
            </Link>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <button onClick={() => onDelete(ticket._id)}>Delete</button>
        </div>

        
    );
};

TicketItem.propTypes = {
    ticket: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TicketItem;
