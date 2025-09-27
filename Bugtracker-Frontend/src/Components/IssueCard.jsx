import React from 'react'
import './Components.css'

export function IssueCard({ issueData, onCardClick = () => { }, onEdit = () => { }, onDelete = () => { } }) {
  const { title, description, status, priority } = issueData;

  return (
    <div
      className="issue-card"
      onClick={() => onCardClick(issueData)}
    >
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-footer">
        <span className={`status-pill status-${status}`}>
          {status}
        </span>
        <span className={`priority-pill priority-${priority}`}>
          {priority}
        </span>
      </div>
    </div>
  )
}
