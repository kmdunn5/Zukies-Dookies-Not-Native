import React, { Component } from 'react'
import Axios from 'axios'
// import DataTable from 'react-data-table-component'
import Dookies from './Dookies'

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

    handleAddVax(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'vaccines/' + this.state.dog.id, 
        {
            vaccine_name: this.state.vaxName,
            date_taken: this.state.vaxDate
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.getVax()
            }
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

    showVaxUpdateForm(e) {

    }

    updateVax(e) {
        e.preventDefault()

        Axios.put(baseUrl + api + 'vaccines/' + this.state.dog.id)
    }

    updateMed(e) {
        e.preventDefault()

        Axios.put(baseUrl + api + 'medicines/' + this.state.dog.id)
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
                    {this.state.mountVax ? (
                        <div>
                            <p>Vax Table</p>
                        </div>
                    ) : ( null )}
                </div>
                <div className='meds-table'>
                    <h3>Medicines</h3>
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