import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
// import DataTable from 'react-data-table-component'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        this.getUserDogs()
    }

    getUserDogs() {
        Axios.get(baseUrl + api + 'dogs/',
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 200) {
            this.setState({
                dogs: res.data.data
            })
        }})
    }

    render() {
        return (
            <div>
                <h1>{this.props.username}</h1>
                <ul>
                    {this.state.dogs.map(dog => {
                        return (
                            <li><Link to={`/dog/${dog.id}`}>{dog.name}</Link></li>       
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default UserHome