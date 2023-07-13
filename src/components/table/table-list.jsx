import React, { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import Pagination from "./pagination";

let PageSize = 10;
const TableList = ({ classes, list }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return list.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Escuela</th>
                        <th>Patronus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map(item => {
                        return (
                            <tr>
                                <td><img className={classes.picture} src={item.image} /></td>
                                <td>{item.name}</td>
                                <td>{item.species}</td>
                                <td>{item.house}</td>
                                <td>{item.patronus}</td>
                                <td><Button>Quitar</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className={classes.paginationComponent}>
                <Pagination
                    currentPage={currentPage}
                    totalCount={list.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </>
    );
}

export default TableList;
