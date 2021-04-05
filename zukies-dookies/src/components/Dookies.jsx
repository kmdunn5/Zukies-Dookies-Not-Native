import React, { Component } from 'react'
import Axios from 'axios'

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
        Axios.get(baseUrl + api + 'dookies/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => this.setState({dookies: res.data.data}))
    }

    render() {
        return (
            <p>POOOOOOOOOPS!</p>
        )
    }
}

export default Dookies