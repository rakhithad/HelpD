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
        const { title, description, status, priority, uid } = req.body;

        // Validate required fields
        if (!title || !description || !status || !priority || !uid) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the ticket in the database
        const newTicket = new Ticket({
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


// Update a ticket
router.patch('/:id', async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
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

module.exports = router;
