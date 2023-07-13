import React from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import TableList from "../table";
import 'bootstrap/dist/css/bootstrap.min.css';

const { Label, Control } = Form;
const Home = ({ classes }) => {
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
                    <TableList />
                </div>
            </Container>
        </div>
    );
}

export default Home;
