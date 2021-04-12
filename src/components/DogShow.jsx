import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'
import Dookies from './Dookies'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import DataTable from 'react-data-table-component'
import { withStyles } from '@material-ui/core/Styles'

import AddVaccine from './AddVaccine'
import AddMedicine from './AddMedicine'

import standing from '../images/161454.jpeg'
import noseOut from '../images/IMG-9645.JPG'
import behindFence from '../images/IMG-9646.JPG'
import lookingUp from '../images/IMG-9651.JPG'

const photos = [standing, noseOut, behindFence, lookingUp]

const randomPhoto = () => {
    let randomNum = Math.floor(Math.random() * photos.length)
    return photos[randomNum]
}

const useStyles = theme => ({
    button: {
        'background-color': '#2a2a72ff',
        color: '#ffffffff',
        margin: '10px'
    }
})

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

let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies-backend.herokuapp.com';
};
let api = '/api/v1/'

class DogShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: '',
            mountDookies: false,
            mountMeds: false,
            mountVax: false,
            vaxButtonClicked: false,
            medsButtonClicked: false,
            seeNotes: false,
            vaccines: '',
            medicines: '',
            dogName: '',
            dogBirthday: '',
            dogBreed: '',
            dogImage: '',
            dogNotes: '',
            vaxName: '',
            vaxDate: '',
            medName: '',
            medRecentDate: '',
            medfrequency: ''
        }
        this.showVaxForm = this.showVaxForm.bind(this)
        this.showVaxTable = this.showVaxTable.bind(this)
        this.getVax = this.getVax.bind(this)
        this.showMedsForm = this.showMedsForm.bind(this)
        this.showMedsTable = this.showMedsTable.bind(this)
        this.getMeds = this.getMeds.bind(this)
        this.showDookies = this.showDookies.bind(this)
        this.showNotes = this.showNotes.bind(this)
    }

    componentDidMount() {
        this.getDog()
    }

    getDog() {
        Axios.get(baseUrl + api + 'dogs/' + this.props.match.params.dogId, 
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({
                dog: res.data.data,
                dogName: res.data.data.name,
                dogBirthday: res.data.data.birthday,
                dogBreed: res.data.data.breed,
                dogImage: res.data.data.image,
                dogNotes: res.data.data.notes,
            })
            this.getVax()
            this.getMeds()
        }})
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
    
    getMeds() {
        Axios.get(baseUrl + api + 'medicines/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({
                medicines: res.data.data,
            })
        }})
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddMed(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'medicines/' + this.state.dog.id, 
        {
            medicine_name: this.state.medName,
            most_recent_date: this.state.medRecentDate,
            frequency: this.state.medfrequency
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.getMeds()
            }
        })
    }

    updateDog(e) {
        e.preventDefault()

        Axios.put(baseUrl + api + 'dogs/' + this.state.dog.id, 
        {
            name: this.state.dogName,
            birthday: this.state.dogBirthday,
            breed: this.state.dogBreed,
            image: this.state.dogImage,
            notes: this.state.dogNotes
        }, {withCredentials: true}
        ).then(res => {if (res.data.status.code === 200) {
            this.getDog()
        }})
    }

    showVaxForm() {
        this.setState({
            vaxButtonClicked: !this.state.vaxButtonClicked,
            mountVax: false,
            mountDookies: false,
            mountMeds: false,
            medsButtonClicked: false,
            seeNotes: false,
        })
    }

    showMedsForm() {
        this.setState({
            medsButtonClicked: !this.state.medsButtonClicked,
            mountMeds: false,
            mountDookies: false,
            mountVax: false,
            vaxButtonClicked: false,
            seeNotes: false,
        })
    }

    showDookies() {
        this.setState({
            mountDookies: !this.state.mountDookies,
            mountMeds: false,
            mountVax: false,
            vaxButtonClicked: false,
            medsButtonClicked: false,
            seeNotes: false,
        })
    }

    showVaxTable() {
        this.setState({
            mountVax: !this.state.mountVax,
            mountDookies: false,
            mountMeds: false,
            vaxButtonClicked: false,
            medsButtonClicked: false,
            seeNotes: false,
        })
    }

    showMedsTable() {
        this.setState({
            mountMeds: !this.state.mountMeds,
            mountDookies: false,
            mountVax: false,
            vaxButtonClicked: false,
            medsButtonClicked: false,
            seeNotes: false,
        })
    }

    // deleteVax(e) {
    //     e.preventDefault()

    //     Axios.delete(baseUrl + api + 'vaccines/' + this.state.dog.id)
    // }

    // deleteMed(e) {
    //     e.preventDefault()

    //     Axios.delete(baseUrl + api + 'medicines/' + this.state.dog.id)
    // }

    showNotes() {
        this.setState({
            seeNotes: !this.state.seeNotes
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <Container maxWidth='lg'>
                    <div className='title'>
                        <h1>Here's your dog, {this.props.user.username}!</h1>
                    </div>
                    {/* maybe an update toggle here? */}
                    <img src={randomPhoto()} alt={this.state.dog.name}/>
                    <div className='dog-data'>
                        <h2>{this.state.dog.name}</h2>
                        <h4>{this.state.dog.breed}</h4>
                        {this.state.seeNotes ? (
                            <div className='notes'>
                                <h4>{this.state.dog.notes}</h4>
                                <Button variant='contained' className={classes.button} onClick={this.showNotes}>Hide Notes</Button>    
                            </div>
                        ) : (
                            <Button variant='contained' className={classes.button} onClick={this.showNotes}>See Notes</Button>
                        )}
                        
                    </div>
                </Container>
                <div className='medical content'>
                    {this.state.mountDookies ? (
                    <div className='dookies-div'>
                        <Button variant='contained' className={classes.button} onClick={this.showDookies}>Hide Dookies</Button>
                        <Dookies dog={this.state.dog} />
                    </div>
                    ) : ( <Button variant='contained' className={classes.button} onClick={this.showDookies}>Show {this.state.dog.name}'s Dookies</Button> )}
                    <div className='vax-meds-columns'>
                        <div className='vaccine-table column'>
                            <h3>Vaccines</h3>
                            {this.state.vaxButtonClicked ? (
                                <div>
                                    <AddVaccine getVax={this.getVax} showVaxForm={this.showVaxForm} dog={this.state.dog}/>
                                    <Button size='small' variant='contained' className={classes.button} onClick={() => this.showVaxForm()}>Cancel</Button>
                                </div>
                            ) : (
                                <Button size='small' variant='contained' className={classes.button} onClick={() => this.showVaxForm()}>Add A Vaccine</Button>)}
                            {this.state.mountVax ? (
                                <div>
                                    <DataTable 
                                        title={`${this.state.dog.name}'s Vaccines`}
                                        columns={vaxColumns}
                                        data={this.state.vaccines}
                                        responsive={true}
                                        striped={true}
                                    />
                                    <Button size='small' variant='contained' className={classes.button} color='primary' onClick={this.showVaxTable}>Hide Table</Button>
                                </div>
                            ) : ( <Button size='small' variant='contained' className={classes.button} color='primary' onClick={this.showVaxTable}>Show Vaccine Table</Button> )}
                        </div>
                    
                        <div className='meds-table column'>
                            <h3>Medicines</h3>
                            {this.state.medsButtonClicked ? (
                                <div>
                                    <AddMedicine getMeds={this.getMeds} showMedsForm={this.showMedsForm} dog={this.state.dog}/>
                                    <Button size='small' variant='contained' className={classes.button} onClick={() => this.showMedsForm()}>Cancel</Button>
                                </div>
                            ) : (
                                <Button size='small' variant='contained' className={classes.button} onClick={() => this.showMedsForm()}>Add A Medicine</Button>)}
                            {this.state.mountMeds ? (
                                <div>
                                    <DataTable 
                                        title={`${this.state.dog.name}'s Medicines`}
                                        columns={medsColumns}
                                        data={this.state.medicines}
                                        responsive={true}
                                        striped={true}
                                    />
                                    <Button size='small' variant='contained' className={classes.button} color='primary' onClick={this.showMedsTable}>Hide Table</Button>
                                </div>
                            ) : ( <Button size='small' variant='contained' className={classes.button} color='primary' onClick={this.showMedsTable}>Show Medicine Table</Button> )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(DogShow)