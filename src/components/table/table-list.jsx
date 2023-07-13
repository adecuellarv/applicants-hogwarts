import React, { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import Pagination from "./pagination";
import batmanimg from './batman.png';

let PageSize = 10;
const TableList = ({ classes, list, deleteItem }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return list.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, list]);

    return (
        <>
            <Table striped bordered hover responsive>
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
                    {currentTableData.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td><img className={classes.picture} src={item?.image ? item?.image : batmanimg} /></td>
                                <td>{item?.name ? item?.name : 'No hay información por mostrar'}</td>
                                <td>{item?.species ? item?.species : 'No hay información por mostrar'}</td>
                                <td>{item?.house ? item?.house : 'No hay información por mostrar'}</td>
                                <td>{item?.patronus ? item?.patronus : 'No hay información por mostrar'}</td>
                                <td><Button onClick={() => { deleteItem(item.id) }}>Quitar</Button></td>
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
