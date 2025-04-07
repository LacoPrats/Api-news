import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, setCurrentPage, totalResults }) {
    const pageSize = 6;
    const totalPages = Math.ceil(totalResults / pageSize);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Limitar visualmente a 6 páginas, centrando la selección si es posible
    const getVisiblePages = () => {
        const visiblePages = [];
        const maxVisible = 6;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = startPage + maxVisible - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className='pagination'>
            <button
                className='prev-btn'
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Prev
            </button>

            <ul className='page-numbers'>
                {visiblePages.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-number ${pageNumber === currentPage ? "active" : ""}`}
                        onClick={() => handlePageClick(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                ))}
            </ul>

            <button
                className='next-btn'
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
