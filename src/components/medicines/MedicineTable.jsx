import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import Button from '@material-ui/core/Button'

import {baseUrl, api} from '../../baseUrl.js'
import MedicineUpdate from './MedicineUpdate'

const medsColumns = [
    {
        name: 'Medicine',
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

const ExpandedRow = ({data, toggleUpdate, update, deleteMed}) => { return (
    <div>
        { update ? 
        (
        <div>
            <MedicineUpdate data={data}/>
            <Button onClick={toggleUpdate}>Cancel</Button>
        </div>
        ):(
        <div>
            <Button onClick={toggleUpdate}>Update</Button>
            <Button onClick={() => deleteMed(data.id)}>Delete</Button>
        </div>
        )}
    </div>
)}

class MedicineTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicines: '',
            update: false,
            showAdd: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.toggleUpdate = this.toggleUpdate.bind(this)
        this.getMeds = this.getMeds.bind(this)
        this.deleteMed = this.deleteMed.bind(this)
    }

    componentDidMount() {
        this.getMeds()
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // toggleMedUpdate(data) {
    //     Axios.put( baseUrl + api + 'medicines' + this.props.dog.id + '/' + data.id,
    //         {update: !data.update},
    //         {withCredentials: true}
    //     ).then(res => { if (res.data.status.code === 200) {
    //         this.getMeds()
    //         }
    //     })
    // }

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

    deleteMed(medId) {
        Axios.delete(baseUrl + api + 'medicines/' + this.props.dog.id + '/' + medId,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.getMeds()
            console.log('deleted')
        }})
    }

    render() {
        return (
            <div>
                <DataTable 
                    title={`${this.props.dog.name}'s Medicines`}
                    columns={medsColumns}
                    data={this.state.medicines}
                    responsive={true}
                    striped={true}
                    pagination
                    expandableRows={true}
                    expandableRowsComponent={<ExpandedRow toggleUpdate={this.toggleUpdate} update={this.state.update} deleteMed={this.deleteMed} />}
                />
            </div>
        )
    }
}

export default MedicineTable