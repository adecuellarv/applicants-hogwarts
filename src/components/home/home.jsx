import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TableList from "../table";
import { getList } from "../../services/get-list";
import { searchFilter, clearListByDeleted } from "../../helpers/common";
import 'bootstrap/dist/css/bootstrap.min.css';

const { Label, Control, Select } = Form;
let fullList = [];
const schoolList = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
const Home = ({ classes }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCleanList, setIsCleanList] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [words, setWords] = useState('');
    const [listDelated, setListDeleted] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (event) => {
        const word = event.target.value;
        setWords(word);
        setSelectValue('');
        setCurrentPage(1);
        let newArray = searchFilter(word, fullList);
        if (listDelated.length)
            newArray = clearListByDeleted(listDelated, newArray);
        setList([...newArray]);
    }

    const handleDeleteItem = (itemDelete) => {
        const arrayDeleted = listDelated;
        arrayDeleted.push(itemDelete);
        setListDeleted(arrayDeleted);
        const newArray = list.filter(item => item.id !== itemDelete.id);
        setList([...newArray]);
    }

    const handleChangeSchool = (event) => {
        const school = event.target.value;
        setSelectValue(school);
        setWords('');
        setCurrentPage(1);
        if (school) {
            let newArray = fullList.filter(item => item.house === school);
            if (listDelated.length)
                newArray = clearListByDeleted(listDelated, newArray);
            setList([...newArray]);
        }else{
            let newArray = fullList;
            if (listDelated.length)
                newArray = clearListByDeleted(listDelated, newArray);
            setList([...newArray]);
        }
    }

    const handleLoadList = () => {
        getInitialList()
        setWords('');
        setSelectValue('');
        setCurrentPage(1);
    }

    const handleClearList = () => {
        setList([]);
        setListDeleted([]);
        setWords('');
        setSelectValue('');
        setIsCleanList(true);
        setCurrentPage(1);
    }

    const getInitialList = async () => {
        setLoading(true);
        setListDeleted([]);
        setIsCleanList(false);
        const resp = await getList();
        if (resp) {
            setTimeout(() => {
                setList(resp);
                fullList = resp;
                setLoading(false);
            }, 800);
        }
    };

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
                                    onChange={(event) => handleSearch(event)}
                                    disabled={loading || isCleanList}
                                />
                            </div>
                        </Col>
                        <Col xxs={12} md={3} lg={3}>
                            <div className={classes.divSelect}>
                                <Label htmlFor="inputSelect">Escuela</Label>
                                <Select
                                    aria-label="Select"
                                    id="inputSelect"
                                    onChange={handleChangeSchool}
                                    value={selectValue}
                                    disabled={loading || isCleanList}
                                >
                                    <option value="">Selecciona...</option>
                                    {schoolList.map((item, key) => {
                                        return (
                                            <option value={item} key={key}>{item}</option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </Col>

                        <Col xxs={12} md={4} lg={4}>
                            <div className={classes.divButtons}>
                                <Button className={classes.buttonCustom} onClick={handleLoadList}>Cargar</Button>
                                <Button className={classes.buttonCustom} variant="danger" onClick={handleClearList}>Limpiar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={`${classes.cardStyle} ${classes.divTable}`}>
                    {!loading ?
                        <TableList
                            list={list}
                            deleteItem={handleDeleteItem}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
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
