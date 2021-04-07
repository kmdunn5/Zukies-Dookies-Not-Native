import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import AddDookie from './AddDookie'

const columns = [
    {
        name: 'Date',
        selector: 'created_date',
        sortable: true
    },
    {
        name: 'Abnormal',
        selector: 'abnormal',
        sortable: true
    },
    {
        name: 'Food',
        selector: 'food',
        sortable: true
    }
]

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class Dookies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dookies: '',
            abnormal: false,
            food: '',
            color: '',
            shape: '',
            consistency: '',
            size: '',
            content: '',
            addForm: false
        }
        this.renderAddForm = this.renderAddForm.bind(this)
    }

    componentDidMount() {
        this.getDookies()
    }

    getDookies() {
        Axios.get(baseUrl + api + 'dookies/' + this.props.dog.id,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({dookies: res.data.data})
        }})
    }

    renderAddForm() {
        this.setState({
            addForm: !this.state.addForm
        })
        this.getDookies()
    }

    deleteDookie() {

    }

    render() {
        return (
            <div>
                <p>POOOOOOOOOPS!</p>
                {this.state.addForm ? (
                <div> 
                    <button onClick={this.renderAddForm}>Nevermind...</button>
                    <AddDookie renderAddForm={this.renderAddForm}/>
                </div>
                ) : (
                    <button onClick={this.renderAddForm}>{this.props.dog.name} Pooped!</button>
                )}
                <DataTable 
                    title={`${this.props.dog.name}'s Dookies`}
                    columns={columns}
                    data={this.state.dookies}
                    striped={true}
                    pagination
                />
            </div>
        )
    }
}

export default Dookies