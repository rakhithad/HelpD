import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';
import { auth } from '../firebase'; // Import Firebase auth to get the logged-in user

const CreateTicketPage = () => {
    const navigate = useNavigate();
    

    const handleSubmit = async (ticketData) => {
        try {
            const uid = auth.currentUser?.uid;  // Get the current user's UID
            
            if (!uid) {
                console.error('No UID found. User might not be authenticated.');
                return;
            }
    
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...ticketData,
                    uid: uid,  // Attach the user's UID to the ticket data
                }),
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
