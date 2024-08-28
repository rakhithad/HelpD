import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';

const CreateTicketPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (ticketData) => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            if (response.ok) {
                const createdTicket = await response.json();
                console.log('Ticket Created:', createdTicket);
                // Optionally, navigate to another page or stay on the form for creating another ticket
            } else {
                console.error('Failed to create ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <div>
            <h2>Create Ticket</h2>
            <TicketForm onSubmit={handleSubmit} />
            <button type="button" onClick={() => navigate('/')}>Done</button>
        </div>
    );
};

export default CreateTicketPage;
