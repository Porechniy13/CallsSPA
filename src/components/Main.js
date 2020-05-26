import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import Clock from 'react-clock'
import styled from 'styled-components'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentTime: new Date(),
            readyCalls: false,
            calls: [],
            id: this.props.location.state.id
        }
        this.setValue = this.setValue.bind(this)
        this.goClock = this.goClock.bind(this)
        this.getCalls = this.getCalls.bind(this)
        this.formattedDate = this.formattedDate.bind(this)
    }

    setValue(val) {
        this.setState({
            currentTime: val
        })
    }

    goClock() {
        const interval = setInterval(
          () => this.setValue(new Date()),
          1000
        );    
        return () => {
          clearInterval(interval);
        }
    } 

    async getCalls() {
        try {
            await axios.get('http://localhost:3000/calls').then(res => {
                console.log(res.data)
                this.setState({
                    calls: res.data,
                    readyCalls: true
                })
            })
        }
        catch {
            alert("Error data loading. Plz, refresh page")
        }
    }

    formattedDate(date) {
        let hh = date.getHours()
        if(hh < 10) hh = '0' + hh;

        let mm = date.getMinutes()
        if(mm < 10) mm = '0' + mm;

        let ss = '00'
        return hh + ":" + mm + ':' + ss;
    }

    componentDidMount() {
        let { readyCalls } = this.state
        if(!readyCalls){
            this.getCalls()
        }
    }

    render() {
        let { currentTime, readyCalls, calls, id } = this.state
        this.goClock()
        if(readyCalls){
            return(
                <div>
                    <Header id={id}/>
                        <Current>
                            <h4>Текущее время:</h4>
                            <Clock value={currentTime} />
                        </Current>  
                        <NextBell>
                            <h4>Следующий звонок через :</h4>
                            <h4>{calls.find((item) => {
                                if(item.finish > this.formattedDate(currentTime) ){
                                    return (Math.abs(item.finish - currentTime))
                                } 
                                if(item.start > this.formattedDate(currentTime)){
                                    return (Math.abs(item.start - currentTime))
                                }
                            })}</h4>
                        </NextBell>             
                </div>
            )
        } else {
            return( <div>Preload...</div>)
        }
        
    }
}

export default Main;

const Current = styled.div`
    width: 30%;
    float: left;
    padding-left: 5%;
    h4 {
        margin-bottom: 5vh;
    }
`;

const NextBell = styled.div`
    width: 30%;
    float: left;
    margin-left: 5%;
`;