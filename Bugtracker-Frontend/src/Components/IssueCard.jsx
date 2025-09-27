import React from 'react'
import './Components.css'
import { IconBtn } from './Buttons/IconBtn';
import { DeleteIcon, EditIcon } from './Icon';

export function IssueCard({ issueData = {}, onCardClick = () => { }, onEdit = () => { }, onDelete = () => { } }) {
  const { title, description, status, priority } = issueData;

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(issueData);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(issueData._id);
  };

  const statusOptions =
  {
    'open': 'Open',
    'in_progress': 'In Progress',
    'done': 'Done',
  };

  const priorityOptions =
  {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
  };

  return (
    <div
      className="issue-card"
      onClick={() => onCardClick(issueData)}
    >
      <div className="card-actions">
        <IconBtn onClick={handleEditClick} variant="primary">
          <EditIcon />
        </IconBtn>
        <IconBtn onClick={handleDeleteClick} variant="danger">
          <DeleteIcon />
        </IconBtn>
      </div>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-footer">
        <span className={`priority-pill priority-${priority}`}>
          {priorityOptions[priority]}
        </span>
        <span className={`status-pill status-${status}`}>
          {statusOptions[status]}
        </span>
      </div>
    </div>
  )
}
