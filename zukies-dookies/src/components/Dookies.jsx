import React, { Component } from 'react'
import Axios from 'axios'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class Dookies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dookies: ''
        }
    }

    componentDidMount() {
        this.getDookies()
    }

    getDookies() {
        Axios.get(baseUrl + api + 'dookies/' + this.props.dogId,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({dookies: res.data.data})
        }})
    }

    render() {
        return (
            <p>POOOOOOOOOPS!</p>
        )
    }
}

export default Dookies