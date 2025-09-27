const { response, request } = require('express');
const { IssueRepository } = require('../repositories/IssueRepository');

const getAllIssues = async (req = request, res = response) => {
    try {
        const results = await IssueRepository.getAll();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

const getIssueById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await IssueRepository.getById(id);
        if (result === null) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

const createIssue = async (req = request, res = response) => {
    console.log(req);
    let { title, description, priority, status } = req.body;
    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['open', 'in_progress', 'done'];

    /** Debería haber un mejor método para realizar las validaciones
    */

    if (!title || typeof title !== 'string') {
        res.status(400).json({ error: 'The "title" field is required and must be a string.' });
        return;
    }

    title = title.trim();

    if (title.length < 3 || title.length > 120) {
        res.status(400).json({ error: 'The "title" field must be between 3 and 120 characters long.' });
        return;
    }

    if (description) {
        if (typeof description !== 'string') {
            res.status(400).json({ error: 'The "description" field must be a string.' });
            return;
        }
        description = description.trim();
        if (description.length > 1000) {
            res.status(400).json({ error: 'The "description" field must not exceed 1000 characters.' });
            return;
        }
    }

    if (priority) {
        if (typeof priority !== 'string' || !validPriorities.includes(priority)) {
            res.status(400).json({ error: `The "priority" field must be one of the following values: ${validPriorities.join(', ')}.` });
            return;
        }
    }

    if (status) {
        if (typeof status !== 'string' || !validStatuses.includes(status)) {
            res.status(400).json({ error: `The "status" field must be one of the following values: ${validStatuses.join(', ')}.` });
            return;
        }
    }

    try {
        const newIssue = await IssueRepository.create({ title, description, priority, status });
        res.status(201).json(newIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

const updateIssue = async (req = request, res = response) => {
    const { id } = req.params;
    let { title, description, priority, status } = req.body;

    if (title) {
        if (typeof title !== 'string') {
            res.status(400).json({ error: 'The "title" field must be a string.' });
            return;
        }
        title = title.trim();
        if (title.length < 3 || title.length > 120) {
            res.status(400).json({ error: 'The "title" field must be between 3 and 120 characters long.' });
            return;
        }
    }

    if (description) {
        if (typeof description !== 'string') {
            res.status(400).json({ error: 'The "description" field must be a string.' });
            return;
        }
        description = description.trim();
        if (description.length > 1000) {
            res.status(400).json({ error: 'The "description" field must not exceed 1000 characters.' });
            return;
        }
    }

    if (priority) {
        if (typeof priority !== 'string' || !validPriorities.includes(priority)) {
            res.status(400).json({ error: `The "priority" field must be one of the following values: ${validPriorities.join(', ')}.` });
            return;
        }
    }

    if (status) {
        if (typeof status !== 'string' || !validStatuses.includes(status)) {
            res.status(400).json({ error: `The "status" field must be one of the following values: ${validStatuses.join(', ')}.` });
            return;
        }
    }

    try {
        const existingIssue = await IssueRepository.getById(id);
        if (existingIssue === null) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        const updatedIssue = await IssueRepository.updateById(id, { title, description, priority, status });
        res.status(200).json(updatedIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

const deleteIssue = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const existingIssue = await IssueRepository.getById(id);
        if (existingIssue === null) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        const deletedIssue = await IssueRepository.deleteById(id);
        res.status(200).json(deletedIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

module.exports = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
};