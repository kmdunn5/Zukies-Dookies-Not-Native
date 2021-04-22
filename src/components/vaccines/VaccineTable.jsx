import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios'

const vaxColumns = [
    {
        name: 'Name',
        selector: 'vaccine_name',
        sortable: true
    },
    {
        name: 'Date Taken',
        selector: 'date_taken',
        format: row => {
            let date = row.date_taken.split('00')
            let dateNoDay = date[0].split(' ')
            dateNoDay.splice(0, 1)
            let newDate = dateNoDay.join(' ')
            return newDate
        },
        sortable: true
    }
]

let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies-backend.herokuapp.com';
};
let api = '/api/v1/'

class VaccineTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: '',
            vaccines: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.getVax = this.getVax.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getVax() {
        Axios.get(baseUrl + api + 'vaccines/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({
                vaccines: res.data.data,
            })
        }})
    }

    render() {
        return (
            <DataTable 
                title={`${this.state.dog.name}'s Vaccines`}
                columns={vaxColumns}
                data={this.state.vaccines}
                responsive={true}
                striped={true}
            />
        )
    }
}

export default VaccineTable