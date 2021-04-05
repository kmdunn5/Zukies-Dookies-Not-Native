import React, { Component } from 'react'
import Axios from 'axios'

let baseUrl = 'http://localhost:5000'
let api = '/api/v1/'

class AllDogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        this.getAllDogs()
    }

    getAllDogs() {
        Axios.get(baseUrl + api + 'dogs/all')
        .then(res => {this.setState({
            dogs: res.data.data
        })})
    }

    render() {
        return (
            <div>
                <p>These are the dogs</p>
                <ul>
                    {this.state.dogs.map(dog => {
                        return (
                            <li>{dog.name}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default AllDogs