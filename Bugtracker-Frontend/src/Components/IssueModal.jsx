import React from 'react';
import './Components.css';
import { Select } from './Select';
import { Button } from './Buttons/Button';

export function IssueModal({ isOpen, onClose, mode, issueData, onSubmit }) {
    if (!isOpen) return null;
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [priority, setPriority] = React.useState('medium'); // 'low', 'medium', 'high'
    const [status, setStatus] = React.useState('open'); // open, in_progress, done

    const isReadOnly = mode === 'view';

    React.useEffect(() => {
        setTitle(issueData?.title || '');
        setDescription(issueData?.description || '');
        setPriority(issueData?.priority || 'medium');
        setStatus(issueData?.status || 'open');
    }, [issueData]);

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ _id: issueData?._id, title, description, priority, status });
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{getTitle()}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <textarea
                        type="text"
                        disabled={isReadOnly || status == 'done'}
                        value={title}
                        onChange={handleTitleChange}
                        required={true}
                    />

                    <label>Description</label>
                    <textarea
                        disabled={isReadOnly}
                        value={description}
                        onChange={handleDescriptionChange}
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
                        {mode !== 'view' && <Button type="submit" variant="primary" >Save Changes</Button>}

                        <Button type="button" variant="secondary" onClick={onClose}>
                            {mode === 'view' ? 'Close' : 'Cancel'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}