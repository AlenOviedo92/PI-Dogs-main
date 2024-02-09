import { useState, useEffect } from 'react';

const Pagination = ({ totalDogs, pageSize, currentPage, onPageChange }) => {

    const[totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(totalDogs/pageSize));
    }, [pageSize, totalDogs]);

    //Para renderizar números de página
    const pageRangeToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pageRangeToShow / 2));
    let endPage = Math.min(startPage + pageRangeToShow - 1, totalPages);

    if (totalPages - endPage < Math.floor(pageRangeToShow / 2)) {
        startPage = Math.max(1, startPage - (Math.floor(pageRangeToShow / 2) - (totalPages - endPage)));
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);                 //Me arroja un array cuyos elementos son una secuencia de números que van desde startPage hasta endPage

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return(
        <div>
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1 || !totalPages}>{'<<'}</button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || !totalPages}>{'<prev>'}</button>
            {
                pages.map((page) => {
                    return <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>{page}</button> 
                })
            }
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>{'<next>'}</button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>{'>>'}</button>
            <br />
            { totalPages === 0 ? <span>Page: 0/{totalPages}</span> : <span>Page: {currentPage}/{totalPages}</span>}
        </div>
    )
};

export default Pagination;
