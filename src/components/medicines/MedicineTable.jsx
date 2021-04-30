import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'

import MedicineUpdate from './MedicineUpdate'

const medsColumns = [
    {
        name: 'Name',
        selector: 'medicine_name',
        sortable: true
    },
    {
        name: 'Most Recent Date Taken',
        selector: 'most_recent_date',
        format: row => {
            let date = row.most_recent_date.split('00')
            let dateNoDay = date[0].split(' ')
            dateNoDay.splice(0, 1)
            let newDate = dateNoDay.join(' ')
            return newDate
        },
        sortable: true
    },
    {
        name: 'Frequency',
        selector: 'frequency',
        sortable: true
    }
]

const ExpandedRow = ({data, toggleUpdate, update}) => { return (
    <div>
        { update ? 
        (
        <div>
            <MedicineUpdate data={data}/>
            <button onClick={toggleUpdate}>Cancel</button>
        </div>
        ):(
        <div>
            <button onClick={toggleUpdate}>Update</button>
            <button>Delete</button>
        </div>
        )}
    </div>
)}

let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies-backend.herokuapp.com';
};
let api = '/api/v1/'

class MedicineTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicines: '',
            update: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.toggleUpdate = this.toggleUpdate.bind(this)
        this.getMeds = this.getMeds.bind(this)
    }

    componentDidMount() {
        this.getMeds()
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    toggleUpdate() {
        this.setState({
            update: !this.state.update
        })
    }

    getMeds() {
        Axios.get(baseUrl + api + 'medicines/' + this.props.dog.id,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({
                medicines: res.data.data,
            })
        }})
    }

    render() {
        return (
            <DataTable 
                title={`${this.props.dog.name}'s Medicines`}
                columns={medsColumns}
                data={this.state.medicines}
                responsive={true}
                striped={true}
                pagination
                expandableRows={true}
                expandableRowsComponent={<ExpandedRow toggleUpdate={this.toggleUpdate} update={this.state.update} />}
            />
        )
    }
}

export default MedicineTable