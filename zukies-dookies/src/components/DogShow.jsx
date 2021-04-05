import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class DogShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: ''
        }
    }

    componentDidMount() {
        this.getDog()
    }

    getDog() {
        Axios.get(baseUrl + api + 'dogs/' + this.props.match.params.dogId, 
            {withCredentials: true}
        ).then(res => console.log(res))
    }

    render() {
        return (
            <div>
                <h1>Here is your Dog, {this.props.role}</h1>      
            </div>
        )
    }
}

export default DogShow