// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['not started', 'in progress', 'stuck', 'done'], default: 'not started' },
    priority: { type: Number, min: 1, max: 5, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
