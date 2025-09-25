const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 120,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'done'],
        default: 'open'
    }
});

model.exports = mongoose.model('Issue', issueSchema);