import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'
import Dookies from './Dookies'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class DogShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: '',
            vaccines: '',
            medicines: ''
        }
    }

    componentDidMount() {
        this.getDog()
        this.getVax()
        this.getMeds()
    }

    getDog() {
        Axios.get(baseUrl + api + 'dogs/' + this.props.match.params.dogId, 
            {withCredentials: true}
        ).then(res => this.setState({dog: res.data.data}))
    }

    getVax() {
        Axios.get(baseUrl + api + 'vaccines/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => this.setState({vaccines: res.data.data}))
    }
    
    getMeds() {
        Axios.get(baseUrl + api + 'medicines/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => this.setState({medicines: res.data.data}))
    }

    render() {
        return (
            <div>
                <h1>Here is your Dog, {this.props.user.username}</h1>
                <Dookies />
            </div>
        )
    }
}

export default DogShow