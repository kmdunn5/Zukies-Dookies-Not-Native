import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios'

import {baseUrl, api} from '../../baseUrl.js'
import VaccineUpdate from './VaccineUpdate'

const vaxColumns = [
    {
        name: 'Vaccine',
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

const ExpandedRow = ({data, toggleUpdate, update}) => { return (
    <div>
        { update ? 
        (
        <div>
            <VaccineUpdate data={data}/>
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

class VaccineTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vaccines: '',
            update: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.getVax = this.getVax.bind(this)
    }

    componentDidMount() {
        this.getVax()
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

    getVax() {
        Axios.get(baseUrl + api + 'vaccines/' + this.props.dog.id,
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
                title={`${this.props.dog.name}'s Vaccines`}
                columns={vaxColumns}
                data={this.state.vaccines}
                responsive={true}
                striped={true}
                pagination
                expandableRows={true}
                expandableRowsComponent={<ExpandedRow toggleUpdate={this.toggleUpdate} update={this.state.update} />}
            />
        )
    }
}

export default VaccineTable