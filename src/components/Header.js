import React, { Component } from 'react'
import styled from 'styled-components'
import { AppBar, FormControl, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id
        }
    }

    render() {
        let { id } = this.state
            return(
                    <div>
                    <h1 align="center">Штука для редактирования звонков</h1>
                    <AppBar position="static" color="primary">
                        <FormControl>
                            <ButtonGroup color="inherit" variant="text" aria-label="text primary button group">>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none'}} to={{pathname: "/timetable", state: {id: id}}}><Button size="small" color="inherit">Распиание звонков</Button></Link>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none'}}  to={{pathname: "/weekends", state: {id: id}}}><Button size="small" color="inherit">Выходные дни</Button></Link>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none'}}  to={{pathname: "/main", state: {id: id}}}><Button size="small" color="inherit">Главная</Button></Link>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none'}}  to={{pathname: "/changes", state: {id: id}}}><Button size="small" color="inherit">Изменения</Button></Link>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none'}}  to={{pathname: "/settings", state: {id: id}}}><Button size="small" color="inherit">Настройки пользователя</Button></Link>
                                <Link style={{color: '#FFFFFF', textDecoration: 'none', float: 'right'}}  to={{pathname: "/"}}><Button size="small" color="inherit">Выйти</Button></Link>
                            </ButtonGroup>
                        </FormControl>
                    </AppBar>
                    </div>
            )
        } 
}


export default Header;

