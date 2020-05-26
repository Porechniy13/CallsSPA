import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { FormControl, Input, Button } from '@material-ui/core'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

const localizer = momentLocalizer(moment)

class Weekends extends Component {
    constructor(props){
        super(props)
        this.state = {
            weekDate: new Date(),
            weekNote: '',
            id: this.props.location.state.id,
            events: []
        }
        this.weekDateHandle = this.weekDateHandle.bind(this)
        this.weekNoteHandle = this.weekDateNote.bind(this)
        this.addWeekend = this.addWeekend.bind(this)
    }

    weekDateHandle(v) {
        this.setState({
            weekDate: v
        })
    }

    weekDateNote(v) {
        this.setState({
            weekNote: v
        })
    }

    addWeekend(e) {
        let { weekDate, weekNote } = this.state

    }

    render() {
        let { weekDate, weekNote, id, events } = this.state
        return(
            <div>
                <Header id={id}/>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        )
    }
}

export default Weekends;