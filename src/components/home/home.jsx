import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import TableList from "../table";
import { getList } from "../../services/get-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const { Label, Control } = Form;
const Home = ({ classes }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getInitialList();
    }, []);

    const getInitialList = async () => {
        const resp = await getList();
        if (resp) {
            setList(resp);
        }
    };


    return (
        <div>
            <div className={classes.divTitle} >
                <h1>Aspirantes a Hogwarts</h1>
            </div>
            <Container>
                <div className={classes.cardStyle}>
                    <Row>
                        <Col xxs={12} md={6} lg={6}>
                            <div>
                                <Label htmlFor="inputSearch">Buscar</Label>
                                <Control
                                    type="text"
                                    id="inputSearch"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={`${classes.cardStyle} ${classes.divTable}`}>
                    {!!list.length &&
                        <TableList list={list} />
                    }
                </div>
            </Container>
        </div>
    );
}

export default Home;
