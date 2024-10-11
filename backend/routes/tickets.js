// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.get('/', async (req, res) => {
    const { uid, role } = req.query;
    console.log('Fetching tickets route hit');
    console.log(`UID: ${uid}, Role: ${role}`);
    

    try {
        let tickets;
        if (role === 'admin' || role === 'support_engineer') {
            tickets = await Ticket.find({});  // Admin and support engineers see all tickets
        } else {
            tickets = await Ticket.find({ uid });  // Customers only see their own tickets
        }
        console.log('Tickets found:', tickets);  // Debugging output
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
});

// Get a single ticket
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to create a new ticket
router.post('/', async (req, res) => {
    try {
        const { tid, account, title, description, status, priority, uid } = req.body;

        // Validate required fields
        if (!tid || !account || !title || !description || !status || !priority || !uid) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the ticket in the database
        const newTicket = new Ticket({
            tid,
            account,
            title,
            description,
            status,
            priority,
            uid,  // UID from Firebase
        });

        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});


// PUT route to update a ticket
router.put('/:id', async (req, res) => {
    const ticketId = req.params.id;
    const { account, title, description, status, priority } = req.body;

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { account, title, description, status, priority },
            { new: true } // Return the updated document
        );
        if (updatedTicket) {
            res.status(200).json(updatedTicket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// Delete a ticket
router.delete('/:id', async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:ticketId/assign', async (req, res) => {
    const { ticketId } = req.params;
    const { supportEngineerId } = req.body;  // UID of the support engineer

    try {
        const ticket = await Ticket.findByIdAndUpdate(ticketId, {
            assignedSupportEngineer: supportEngineerId || 'Not Assigned'
        }, { new: true });

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign support engineer' });
    }
});

router.get('/', async (req, res) => {
    try {
        const engineerId = req.query.assignedSupportEngineer;
        console.log(`Fetching tickets route hit`);
        console.log(`UID: ${engineerId}`);
        if (!engineerId) {
            return res.status(400).json({ error: 'Support engineer ID is required' });
        }
        
        const tickets = await Ticket.find({ assignedSupportEngineer: engineerId });
        console.log(tickets); // Log the tickets to see if they exist
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tickets for the engineer' });
    }
});



module.exports = router;
