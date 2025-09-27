import React from 'react';
import { IssueCard } from './IssueCard';
import "./Components.css"

export function IssueCardsContainer({ issues, onCardClick, onEdit, onDelete }) {
    if (!issues || issues.length === 0) {
        return (
            <div className="no-issues-message">
                <p>No issues found. Try adjusting your filters or create a new one!</p>
            </div>
        );
    }

    return (
        <div className="issue-cards-container">
            {issues.map((issue) => (
                <IssueCard
                    key={issue._id}
                    issueData={issue}
                    onCardClick={onCardClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}