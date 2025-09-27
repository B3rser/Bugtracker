import React from 'react';
import './Components.css';
import { Select } from './Select';

export function IssueModal({ isOpen, onClose, mode, issueData, onSubmit }) {
    if (!isOpen) return null;
    const [priority, setPriority] = React.useState('low'); // 'low', 'medium', 'high'
    const [status, setStatus] = React.useState('open'); // open, in_progress, done

    const isReadOnly = mode === 'view';

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const statusOptions = [
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
    ];

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    const getTitle = () => {
        if (mode === 'create') return 'Create New Issue';
        if (mode === 'edit') return 'Edit Issue';
        return 'Issue Details';
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{getTitle()}</h2>

                <form onSubmit={onSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        defaultValue={issueData?.title || ''}
                        disabled={isReadOnly}
                    />

                    <label>Description</label>
                    <textarea
                        defaultValue={issueData?.description || ''}
                        disabled={isReadOnly}
                    />

                    <Select
                        label="Priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        options={priorityOptions}
                        readOnly={isReadOnly}
                    />

                    <Select
                        label="Status"
                        value={status}
                        onChange={handleStatusChange}
                        options={statusOptions}
                        readOnly={isReadOnly}
                    />

                    <div className="modal-actions">
                        {mode !== 'view' && <button type="submit">Save Changes</button>}

                        <button type="button" onClick={onClose}>
                            {mode === 'view' ? 'Close' : 'Cancel'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}