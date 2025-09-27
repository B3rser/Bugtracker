import React from 'react'
import { CloseIcon } from './Icon';

// type = 'info', 'success', 'warning', 'error'

export function Toast({ message, type = 'info', onClose }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <p className="toast-message">{message}</p>
            <button className="toast-close-btn" onClick={onClose}>
                <CloseIcon />
            </button>
        </div>
    );
}