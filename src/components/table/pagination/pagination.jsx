import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';

const Pagination = ({
    classes,
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
}) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classes.paginationContainer}
        >
            <li
                className={classes.paginationItem}
                onClick={onPrevious}
            >
                <div>{'<'}</div>
            </li>
            {paginationRange.map((pageNumber, key) => {
                if (pageNumber === DOTS) {
                    return <li key={key}>&#8230;</li>;
                }

                return (
                    <li
                        className={classes.paginationItem}
                        onClick={() => onPageChange(pageNumber)}
                        key={key}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classes.paginationItem}
                onClick={onNext}
            >
                <div>{'>'}</div>
            </li>
        </ul>
    );
};

export default Pagination;