import React, { Component } from 'react'
import Axios from 'axios'

import standing from '../images/161454.jpeg'
import noseOut from '../images/IMG-9645.JPG'
import behindFence from '../images/IMG-9646.JPG'
import lookingUp from '../images/IMG-9651.JPG'

const photos = [standing, noseOut, behindFence, lookingUp]

const randomPhoto = () => {
    let randomNum = Math.floor(Math.random() * photos.length)
    return photos[randomNum]
}

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'

class AllDogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        this.getAllDogs()
    }

    getAllDogs() {
        Axios.get(baseUrl + api + 'dogs/all')
        .then(res => {this.setState({
            dogs: res.data.data
        })})
    }

    render() {
        return (
            <div>
                <p>These are the dogs</p>
                    {this.state.dogs.map(dog => {
                        return (
                            <div key={dog.id}>
                                <p>{dog.name}</p>
                                <img  src={randomPhoto()} alt="random dog"/>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default AllDogs