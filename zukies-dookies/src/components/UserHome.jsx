import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import Button from '@material-ui/core/Button'

import AddDog from './AddDog'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true
    },
    {
        name: 'Birthday',
        selector: 'birthday',
        sortable: true
    },
    {
        name: 'Breed',
        selector: 'breed',
        sortable: true
    }
]

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dogs: [],
            addDog: false
        }
        this.getUserDogs = this.getUserDogs.bind(this)
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

    toggleAddState() {
        this.setState({
            addDog: !this.state.addDog
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.user.username}</h1>
                <DataTable 
                    title={`${this.props.user.username}'s Dogs`}
                    columns={columns}
                    data={this.state.dogs}
                    keyField={'id'}
                    responsive={true}
                    striped={true}
                    onRowClicked={(row) => {
                        this.props.history.push('/dog/' + row.id)
                    }}
                     />
                {this.state.addDog ? (
                    <div>
                        <AddDog getUserDogs={this.getUserDogs}/>
                        <Button variant='contained' color='primary' onClick={() => this.toggleAddState()}>Cancel</Button>
                    </div>
                ) : (
                    <Button variant='contained' color='primary' onClick={() => this.toggleAddState()}>Time To Add a New Dog!</Button>
                )}
            </div>
        )
    }
}

export default UserHome