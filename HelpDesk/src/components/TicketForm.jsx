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
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <div>
                <label className="block font-semibold">Company or Person:</label>
                <input className="border p-2 w-full"
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block font-semibold">Title:</label>
                <input className="border p-2 w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block font-semibold">Description:</label>
                <textarea className="border p-2 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label className="block font-semibold">Status:</label>
                <select className="border p-2 w-full"
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
                <label className="block font-semibold">Priority:</label>
                <input className="border p-2 w-full"
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <button type="submit" className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Save</button>
        </form>
    );
};

TicketForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default TicketForm;
