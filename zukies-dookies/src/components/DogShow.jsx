import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'
import Dookies from './Dookies'
import Button from '@material-ui/core/Button'
import AddVaccine from './AddVaccine'
import AddMedicine from './AddMedicine'

const vaxColumns = [
    {
        name: 'Name',
        selector: 'vaccine_name',
        sortable: true
    },
    {
        name: 'Date Taken',
        selector: 'date_taken',
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
        sortable: true
    },
    {
        name: 'Frequency',
        selector: 'frequency',
        sortable: true
    }
]

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

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
        this.getVax = this.getVax.bind(this)
        this.showMedsForm = this.showMedsForm.bind(this)
        this.getMeds = this.getMeds.bind(this)
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
                mountDookies: true
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
                mountVax: true
            })
        }})
    }
    
    getMeds() {
        Axios.get(baseUrl + api + 'medicines/' + this.props.match.params.dogId,
            {withCredentials: true}
        ).then(res => { if (res.data.status.code === 200) {
            this.setState({
                medicines: res.data.data,
                mountMeds: true
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
            mountVax: !this.state.mountVax,
            vaxButtonClicked: !this.state.vaxButtonClicked
        })
    }

    showMedsForm() {
        this.setState({
            mountMeds: !this.state.mountMeds,
            medsButtonClicked: !this.state.medsButtonClicked
        })
    }

    deleteVax(e) {
        e.preventDefault()

        Axios.delete(baseUrl + api + 'vaccines/' + this.state.dog.id)
    }

    deleteMed(e) {
        e.preventDefault()

        Axios.delete(baseUrl + api + 'medicines/' + this.state.dog.id)
    }

    render() {
        return (
            <div>
                <h1>Here is your Dog, {this.props.user.username}</h1>
                {/* maybe an update toggle here? */}
                <img src={this.state.dog.image} alt={this.state.dog.name}/>
                <h2>{this.state.dog.name}</h2>
                <h4>{this.state.dog.breed}</h4>
                {this.state.mountDookies ? (
                <div>
                    <Dookies dog={this.state.dog} />
                </div>
                ) : ( null )}
                <div className='vaccine-table'>
                    <h3>Vaccines</h3>
                    {this.state.vaxButtonClicked ? (
                        <div>
                            <AddVaccine getVax={this.getVax} showVaxForm={this.showVaxForm} dog={this.state.dog}/>
                            <Button size='small' variant='outlined' onClick={() => this.showVaxForm()}>Cancel</Button>
                        </div>
                    ) : (
                        <Button size='small' variant='outlined' onClick={() => this.showVaxForm()}>Add A Vaccine</Button>)}
                    {this.state.mountVax ? (
                        <div>
                            <p>Vax Table</p>
                        </div>
                    ) : ( null )}
                </div>
                <div className='meds-table'>
                    <h3>Medicines</h3>
                    {this.state.medsButtonClicked ? (
                        <div>
                            <AddMedicine getMeds={this.getMeds} showMedsForm={this.showMedsForm} dog={this.state.dog}/>
                            <Button size='small' variant='outlined' onClick={() => this.showMedsForm()}>Cancel</Button>
                        </div>
                    ) : (
                        <Button size='small' variant='outlined' onClick={() => this.showMedsForm()}>Add A Medicine</Button>)}
                    {this.state.mountMeds ? (
                        <div>
                            <p>Meds Table</p>
                        </div>
                    ) : ( null )}
                </div>
            </div>
        )
    }
}

export default DogShow