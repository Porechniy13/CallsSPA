import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import styled from 'styled-components'
import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow , Button} from '@material-ui/core'

class Changes extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.location.state.id,
            user: {},
            readyLogs: false,
            logs: []
        }
        this.getLogs = this.getLogs.bind(this)
    }

    async getLogs() {
        try {
            await axios.get('http://localhost:3000/logs').then(res => {
                this.setState({
                    logs: res.data,
                    readyLogs: true
                })
            })
        }
        catch {
            alert("Error data loading. Plz, refresh page")
        }
    }

    componentDidMount() {
        let { readyLogs } = this.state
        if(!readyLogs){
            this.getLogs()
        }
    }

    render() {
        let { id, logs, readyLogs } = this.state
        if(readyLogs){
        return(
            <div>
                <Header id={id}/>
                <Container>
                <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                {columns.map((item) => {
                                    return(
                                        <TableCell key={item.id}>{item.label}</TableCell>
                                    )
                                })}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {logs.map((note, index) => {
                                    return (                                       
                                            <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {note.login}
                                            </TableCell>
                                            <TableCell align="left">{note.prevState}</TableCell>
                                            <TableCell align="left">{note.newState}</TableCell>
                                            <TableCell align="left">{note.move}</TableCell>
                                            </TableRow>                                        
                                    )
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </Container>
                        <Text>
                            <Paper>
                                <p>Сюда вставишь текст</p>
                                <p>Блок резиновый, высота растянется под количество текста</p>
                            </Paper>                            
                        </Text>
            </div>
        )} else {
            return (<div>Preload...</div>)
        }
    }
}

export default Changes;

const columns = [
    { id: 'Login', label: 'Логин', minWidth: 170 },
    { id: 'prevState', label: 'Предыдущее состояние', minWidth: 170 },
    { id: 'newState', label: 'Новое состояние', minWidth: 170 },
    { id: 'move', label: 'Действие', minWidth: 170 }
]

const Text = styled.div`
    width: 30%;
    float: left;
`;

const Container = styled.div`
    width: 70%;
    float: left;
`;