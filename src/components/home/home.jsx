import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TableList from "../table";
import { getList } from "../../services/get-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const { Label, Control, Select } = Form;
let fullList = [];
const Home = ({ classes }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [words, setWords] = useState('');

    const getInitialList = async () => {
        setLoading(true);
        const resp = await getList();
        if (resp) {
            setTimeout(() => {
                setList(resp);
                fullList = resp;
                setLoading(false);
            }, 800);
        }
    };

    const searchFilter = (input) => {
        return Object.keys(fullList).filter(key => {
            const nameList = fullList[key].name.toLowerCase();
            return nameList.includes(input.toLowerCase())
        })
            .map(foundKey => ({ ...fullList[foundKey], key: foundKey }))
    }

    const search = (event) => {
        const word = event.target.value;
        setWords(word);
        setSelectValue('');
        const newArray = searchFilter(word);
        setList([...newArray]);
    }

    const deleteItem = (id) => {
        const newArray = list.filter(item => item.id !== id);
        setList([...newArray]);
    }
    
    const changeSchool = (event) => {
        const school = event.target.value;
        setSelectValue(school);
        setWords('');
        if(school){
            const newArray = fullList.filter(item => item.house === school);
            setList([...newArray]);
        }
    }

    useEffect(() => {
        getInitialList();
    }, []);

    return (
        <div>
            <div className={classes.divTitle} >
                <h1>Aspirantes a Hogwarts</h1>
            </div>
            <Container>
                <div className={classes.cardStyle}>
                    <Row>
                        <Col xxs={12} md={5} lg={5}>
                            <div>
                                <Label htmlFor="inputSearch">Buscar</Label>
                                <Control
                                    type="text"
                                    id="inputSearch"
                                    value={words}
                                    onChange={(event) => search(event)}
                                />
                            </div>
                        </Col>
                        <Col xxs={12} md={3} lg={3}>
                            <div className={classes.divSelect}>
                                <Label htmlFor="inputSelect">Escuela</Label>
                                <Select 
                                    aria-label="Default select example" 
                                    id="inputSelect"
                                    onChange={changeSchool} 
                                    value={selectValue}
                                >
                                    <option value="">Selecciona...</option>
                                    <option value="Gryffindor">Gryffindor</option>
                                    <option value="Slytherin">Slytherin</option>
                                    <option value="Hufflepuff">Hufflepuff</option>
                                    <option value="Ravenclaw">Ravenclaw</option>
                                </Select>
                            </div>
                        </Col>

                        <Col xxs={12} md={4} lg={4}>
                            <div className={classes.divButtons}>
                                <Button className={classes.buttonCustom} onClick={() => getInitialList()}>Cargar</Button>
                                <Button className={classes.buttonCustom} variant="danger" onClick={() => setList([])}>Limpiar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={`${classes.cardStyle} ${classes.divTable}`}>
                    {!loading ?
                        <TableList
                            list={list}
                            deleteItem={deleteItem}
                        />
                        :
                        <div className={classes.divLoading}>
                            <h1>Loading...</h1>
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
}

export default Home;
