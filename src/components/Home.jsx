import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

import AllDogs from './AllDogs'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDogs: false
        }
        this.showDogs = this.showDogs.bind(this)
    }

    showDogs() {
        this.setState({
            showDogs: !this.state.showDogs
        })
    }

    render() {
        return (
            <div>
                <h1 className='title'>Welcome to Zukies Dookies!</h1>
                <Button variant='contained' color='primary' onClick={() => this.showDogs()}>{this.state.showDogs ? <span>Minimize Dogs</span> : <span>Show Dogs</span>}</Button>
                { this.state.showDogs ? <AllDogs /> : null }
            </div>
        ) 
    }
}

export default Home