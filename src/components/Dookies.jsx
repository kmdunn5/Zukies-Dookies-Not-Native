import React, { Component } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import AddDookie from './AddDookie'

// import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

const customStyles = {
    // table: {
    //     style: {
    //         fontFamily: "Nunito",
    //     }
    // },
    // rows: {
    //   style: {
    //     minHeight: '72px', // override the row height
    //   }
    // },
    // headCells: {
    //   style: {
    //     paddingLeft: '8px', // override the cell padding for head cells
    //     paddingRight: '8px',
    //   },
    // },
    // cells: {
    //   style: {
    //     paddingLeft: '8px', // override the cell padding for data cells
    //     paddingRight: '8px',
    //   },
    // },
  };

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
    <Table className='table' id='table'>
        <TableHead className='table-header'>
            <TableRow className='table-row'>
                <TableCell id='header-item'>Color</TableCell>
                <TableCell id='header-item'>Shape</TableCell>
                <TableCell id='header-item'>Consistency</TableCell>
                <TableCell id='header-item'>Size</TableCell>
                <TableCell id='header-item'>Content</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow className='table-row'>
                <TableCell className='table-data' id='table-data'>{data.color}</TableCell>
                <TableCell className='table-data' id='table-data'>{data.shape}</TableCell>
                <TableCell className='table-data' id='table-data'>{data.consistency}</TableCell>
                <TableCell className='table-data' id='table-data'>{data.size}</TableCell>
                <TableCell className='table-data' id='table-data'>{data.content}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
)}


let baseUrl

if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.API_URL;
} else {
    baseUrl = 'http://localhost:5000';
};

let api = '/api/v1/'

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
        // const { classes } = this.props;
        return (
            <div>
                <p>POOOOOOOOOPS!</p>
                {this.state.addForm ? (
                <div> 
                    <Button color='primary' variant='outlined' onClick={this.renderAddForm}>Nevermind...</Button>
                    <AddDookie renderAddForm={this.renderAddForm} dog={this.props.dog}/>
                </div>
                ) : (
                    <Button color='primary' variant='outlined' onClick={this.renderAddForm}>{this.props.dog.name} Pooped Today!</Button>
                )}
                <DataTable 
                    title={`${this.props.dog.name}'s Dookies`}
                    columns={columns}
                    data={this.state.dookies}
                    customStyles={customStyles}
                    striped={true}
                    pagination
                    expandableRows={true}
                    expandableRowsComponent={<ExpandedRow />}
                />
            </div>
        )
    }
}

// export default withStyles(useStyles)(Dookies)
export default Dookies