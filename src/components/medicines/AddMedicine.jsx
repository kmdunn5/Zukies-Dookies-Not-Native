import React, { Component } from 'react'
import Axios from 'axios'

import {baseUrl, api} from '../../baseUrl.js'

class AddMedicine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medName: '',
            medRecentDate: '',
            medFrequency: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddMed = this.handleAddMed.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddMed(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'medicines/' + this.props.dog.id,
        {
            medicine_name: this.state.medName,
            most_recent_date: this.state.medRecentDate,
            frequency: this.state.medFrequency
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.getMeds()
            this.props.showMedsForm()
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddMed}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="medName" onChange={this.handleChange} value={this.state.medName}/>
                    <label htmlFor="medRecentDate">Most Recent Date Taken: </label>
                    <input type="date" name="most_recent_date" id="medRecentDate" onChange={this.handleChange} value={this.state.medRecentDate} min="2010-01-01" max="2100-12-31"/>
                    <label htmlFor="medFrequency">Frequency: </label>
                    <input type="text" name="frequency" id="medFrequency" onChange={this.handleChange} value={this.state.medFrequency}/>
                    <input type="submit" value="Add Medicine"/>
                </form>
            </div>
        )
    }
}

export default AddMedicine