import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'

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

    routeToDog(id) {
        this.props.history.push('/dog/' + id)
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

                    
                {/* <ul>
                    {this.state.dogs.map(dog => {
                        return (
                            <li><Link to={`/dog/${dog.id}`}>{dog.name}</Link></li>       
                        )
                    })}
                </ul> */}
            </div>
        )
    }
}

export default UserHome