import React from 'react'
import './Buttons.css';
import { PlusIcon } from '../Icon';

export function FloatingBtn({ onClick }) {
    return (
        <button
            className='floating-btn'
            style={{
                bottom: '20px',
                right: '20px',
            }}
            onClick={onClick}
        >
            <PlusIcon />
        </button>
    );
}