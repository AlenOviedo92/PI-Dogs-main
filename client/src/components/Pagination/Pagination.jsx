import { useState, useEffect } from 'react';
import style from './Pagination.module.css';

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
        <div className={style.container}>
            <div>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1 || !totalPages} className={style.buttons}>{'<<'}</button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || !totalPages} className={style.buttons}>{'<prev>'}</button>
                {
                    pages.map((page) => {
                        return <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage} className={style.buttons}>{page}</button> 
                    })
                }
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className={style.buttons}>{'<next>'}</button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className={style.buttons}>{'>>'}</button>
            </div>
            <div className={style.pages}>
                { totalPages === 0 ? <span>Page: 0/{totalPages}</span> : <span>Page: {currentPage} of {totalPages}</span>}
            </div>
        </div>
    )
};

export default Pagination;
