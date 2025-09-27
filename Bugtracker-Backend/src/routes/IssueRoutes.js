const { Router } = require('express');
const { getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue } = require('../controllers/issueController');    
const router = Router();

router.get('/', getAllIssues);
router.get('/:id', getIssueById);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);


module.exports = router;