import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

import AddDog from './AddDog'


import standing from '../images/161454.jpeg'
import noseOut from '../images/IMG-9645.JPG'
import behindFence from '../images/IMG-9646.JPG'
import lookingUp from '../images/IMG-9651.JPG'
import { CardActionArea } from '@material-ui/core'

const photos = [standing, noseOut, behindFence, lookingUp]

const randomPhoto = () => {
    let randomNum = Math.floor(Math.random() * photos.length)
    return photos[randomNum]
}

if (process.env.NODE_ENV === 'development') {
    let baseUrl = 'http://localhost:5000';
} else {
    let baseUrl = 'https://zookies-dookies.herokuapp.com';
};

console.log(baseUrl)

let api = 'api/v1/'

// const columns = [
//     {
//         name: 'Name',
//         selector: 'name',
//         sortable: true
//     },
//     {
//         name: 'Birthday',
//         selector: 'birthday',
//         format: row => {
//             let date = row.birthday.split('00')
//             let dateNoDay = date[0].split(' ')
//             dateNoDay.splice(0, 1)
//             let newDate = dateNoDay.join(' ')
//             return newDate
//         },
//         sortable: true
//     },
//     {
//         name: 'Breed',
//         selector: 'breed',
//         sortable: true
//     }
// ]

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
                <h1>Welcome, {this.props.user.username}! Glad to have you here. </h1>
                {/* <DataTable 
                    title="Choose your dog!"
                    columns={columns}
                    data={this.state.dogs}
                    keyField={'id'}
                    responsive={true}
                    striped={true}
                    onRowClicked={(row) => {
                        this.props.history.push('/dog/' + row.id)
                    }}
                     /> */}
                <Grid container spacing={2}>
                    <Grid item>
                        <Grid container spacing={2} justify='center'>
                            {this.state.dogs.map( dog => {
                                return (
                                    <Card key={dog.id} className='each-dog'>
                                        <Link to={`/dog/${dog.id}`}>
                                            <CardActionArea>
                                                <p>{dog.name}</p>
                                                <img src={randomPhoto()} alt={dog.name} />
                                            </CardActionArea>
                                        </Link>
                                    </Card>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <div className='add-dog-button'>
                {this.state.addDog ? (
                    <div>
                        <AddDog getUserDogs={this.getUserDogs}/>
                        <Button size='small' variant='contained' color='primary' onClick={() => this.toggleAddState()}>Cancel</Button>
                    </div>
                ) : (
                    <Button size='small' variant='contained' color='primary' onClick={() => this.toggleAddState()}>Time To Add a New Dog!</Button>
                )}
                </div>
            </div>
        )
    }
}

export default UserHome