import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { Paper, FormControl, Input, Button } from '@material-ui/core'
import styled from 'styled-components'

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            loadData: false,
            id: this.props.location.state.id
        }
        this.getUser = this.getUser.bind(this)
        this.goToNew = this.goToNew.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async getUser() {
        try{
            let result;
            let { loadData, id } = this.state
            if(!loadData){
                await axios.get(`http://localhost:3000/users/${id}`).then(res => {
                    result = res.data
                })
                this.setState({
                    user: result[0],
                    loadData: true
                })
            }
        } 
        catch {
            alert("Error data download. Please refresh page")
        }                
    }

    goToNew() {
        let { user } = this.state
        this.props.history.push({
            pathname: "/add-user",
            state: {id: user.id}
        })
    }

    handleChange(val, type) {
        let { user } = this.state
        let buffer = user[type]
        user[type] = val
        this.setState({
            user: user
        })
        axios.post("http://localhost:3000/update-user", user).then(res => {
            console.log(res)
        })
        axios.post("http://localhost:3000/add-logs", {
            login: user.login,
            prevState: `${type}: ${buffer}`,
            newState: `${type}: ${val}`,
            move: 'Изменение данных пользователя'
        }).then(res => {
            console.log(res)
        })
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        let { user, loadData, id } = this.state
        if(loadData){
            return(
                <div>                    
                    <Header id={id}/>
                    <FormContainer>
                        <Paper style={{paddingTop: 2 + 'vh', paddingBottom: 2 + 'vh'}}>
                        <h3 align="center">Данные пользователя</h3>       
                        <hr></hr>                 
                        <FormControl style={{marginLeft: 10 + '%'}}>
                            <h4>Логин</h4><Input onChange={(e) => this.handleChange(e.target.value, 'login')} value={user.login}></Input>
                            <h4>Пароль</h4><Input onChange={(e) => this.handleChange(e.target.value, 'password')} value={user.password}></Input>
                            <h4>Имя</h4><Input onChange={(e) => this.handleChange(e.target.value, 'name')} value={user.name}></Input>
                            <h4>Фамилия</h4><Input onChange={(e) => this.handleChange(e.target.value, 'surname')} value={user.surname}></Input>                            
                        </FormControl>  
                        <FormControl style={{marginLeft: 20 + '%'}}>
                            <h4>Отчество</h4><Input onChange={(e) => this.handleChange(e.target.value, 'patronum')} value={user.patronum}></Input>
                            <h4>Телефон</h4><Input onChange={(e) => this.handleChange(e.target.value, 'phone')} value={user.phone}></Input>
                            <h4>E-mail</h4><Input onChange={(e) => this.handleChange(e.target.value, 'email')} value={user.email}></Input>
                            <h4>Отдел</h4><Input onChange={(e) => this.handleChange(e.target.value, 'departament')} value={user.departament}></Input>
                        </FormControl> 
                        </Paper>
                        <Button style={{marginLeft: 15 + '%'}} onClick={(e) => this.goToNew()}>Добавить пользователя</Button>
                        <Button style={{marginLeft: 15 + '%'}} onClick={(e) => this.handleChange()}>Сохранить изменения</Button>
                    </FormContainer>                 
                </div>
            )
        } else {
            return (
                
                <div>Preload...</div>
            )
        }        
    }
}

export default Settings;

const FormContainer = styled.div`
    width: 50%;
    margin-left: 25%;
`;