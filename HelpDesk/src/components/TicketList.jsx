
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, onDelete }) => {
    return (
        <ul>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} onDelete={onDelete} />
            ))}
        </ul>
    );
};

// Define prop types for your component
TicketList.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            priority: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TicketList;
