import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default function PaginationComponet({ rowsPerPage, totalRows, pageActive, onPageChange }) {
    const pageNumber = []

    for (let i = 1; i < Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumber.push(i)
    }
    
    if (pageNumber.length < 2) {
        return (
            <>
            </>
        )
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)}/>
            <Pagination.Prev onClick={() => onPageChange(pageActive - 1)}/>

            {pageNumber.map(number => (
                <Pagination.Item 
                    onClick={() => onPageChange(number)}
                    active={ number === pageActive }
                    >{number}</Pagination.Item>
            ))}

            <Pagination.Next onClick={() => onPageChange(pageActive + 1)}/>
            <Pagination.Last onClick={() => onPageChange(totalRows)}/>
        </Pagination>
    )
}
