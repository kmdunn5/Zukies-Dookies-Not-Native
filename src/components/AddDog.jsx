import React, { Component } from 'react'
import Axios from 'axios'
// import Button from '@material-ui/core/Button'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class AddDog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            birthday: '',
            breed: '',
            image: '',
            notes: '', 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'dogs/', 
        {
            name: this.state.name,
            birthday: this.state.birthday,
            breed: this.state.breed,
            // image: this.state.image,
            notes: this.state.notes
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.getUserDogs()
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name}/>
                    <label htmlFor="birthday">Birthday: </label>
                    <input type="date" name="birthday" id="birthday" onChange={this.handleChange} value={this.state.birthday} min="2000-01-01" max="2100-12-31"/>
                    <label htmlFor="breed">Breed: </label>
                    <input type="text" name="breed" id="breed" onChange={this.handleChange} value={this.state.breed}/>
                    <label htmlFor="notes">Notes: </label>
                    <textarea name="notes" id="notes" onChange={this.handleChange} value={this.state.notes}/>
                    <input type="submit" value="Add Dog"/>
                </form>
            </div>
        )
    }
}

export default AddDog