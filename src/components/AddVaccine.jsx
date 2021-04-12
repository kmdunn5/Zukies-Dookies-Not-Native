import React, { Component } from 'react'
import Axios from 'axios'

let baseUrl

if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.API_URL;
} else {
    baseUrl = 'http://localhost:5000';
};
let api = '/api/v1/'

class AddVaccine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vaxName: '',
            vaxDate: '' 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddVax = this.handleAddVax.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddVax(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'vaccines/' + this.props.dog.id,
        {
            vaccine_name: this.state.vaxName,
            date_taken: this.state.vaxDate
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.getVax()
            this.props.showVaxForm()
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddVax}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="vaxName" onChange={this.handleChange} value={this.state.vaxName}/>
                    <label htmlFor="vaxDate">Date Given: </label>
                    <input type="date" name="date_taken" id="vaxDate" onChange={this.handleChange} value={this.state.vaxDate} min="2010-01-01" max="2100-12-31"/>
                    <input type="submit" value="Add Vaccine"/>
                </form>
            </div>
        )
    }
}

export default AddVaccine