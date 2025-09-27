import React from 'react'
import { Button } from '../Components/Buttons/Button';

export function PaginationContainer({ pagination, goToPage }) {
    return (
        <div className="pagination-container">
            <Button variant="primary" onClick={() => goToPage(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}>
                Previous
            </Button>
            <span>
                Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button variant="primary" onClick={() => goToPage(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}>
                Next
            </Button>
        </div>
    )
}
