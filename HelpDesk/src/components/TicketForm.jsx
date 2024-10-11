import { useState } from 'react';
import PropTypes from 'prop-types';

const TicketForm = ({ onSubmit }) => {
    const [account, setAccount] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('not started');
    const [priority, setPriority] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const ticketData = {
            tid: Math.floor(Math.random() * 1000), // Random ticket ID
            account,
            title,
            description,
            status,
            priority,
        };

        onSubmit(ticketData);

        // Reset form fields
        setAccount('');
        setTitle('');
        setDescription('');
        setStatus('not started');
        setPriority(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Company or Person:</label>
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="stuck">Stuck</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div>
                <label>Priority:</label>
                <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

TicketForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default TicketForm;
