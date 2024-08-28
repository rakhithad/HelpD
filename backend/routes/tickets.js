// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        console.log('GET /tickets');
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
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

// Create a new ticket
router.post('/', async (req, res) => {
    const { title, description, status, priority } = req.body;
    const ticket = new Ticket({
        title,
        description,
        status,
        priority,
    });

    try {
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
