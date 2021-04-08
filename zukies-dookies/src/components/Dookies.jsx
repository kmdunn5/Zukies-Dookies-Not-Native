import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import AddDookie from './AddDookie'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const columns = [
    {
        name: 'Date',
        selector: 'created_date',
        format: row => {
                let date = row.created_date
                let dateSplit = date.split('00')
                return dateSplit[0]
            },
        sortable: true
    },
    {
        name: 'Abnormal',
        selector: 'abnormal',
        format: row => {return row.abnormal ? ('yes'):('no')},
        sortable: true
    },
    {
        name: 'Food',
        selector: 'food',
        sortable: true
    }
]

const ExpandedRow = ({data}) => { return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell variant='th'>Color</TableCell>
                <TableCell variant='th'>Shape</TableCell>
                <TableCell variant='th'>Consistency</TableCell>
                <TableCell variant='th'>Size</TableCell>
                <TableCell variant='th'>Content</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>{data.color}</TableCell>
                <TableCell>{data.shape}</TableCell>
                <TableCell>{data.consistency}</TableCell>
                <TableCell>{data.size}</TableCell>
                <TableCell>{data.content}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
)}


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
                    <AddDookie renderAddForm={this.renderAddForm} dog={this.props.dog}/>
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
                    expandableRows={true}
                    expandableRowsComponent={<ExpandedRow />}
                />
            </div>
        )
    }
}

export default Dookies