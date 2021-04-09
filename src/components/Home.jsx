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
                <div className='description'>
                    <p className='description description1'>Here, you can keep track of some of the medical needs of your dog friend or friends. This site was created because my partner and I are both new to being dog parents. Not knowing much about pet care, we decided that the best thing we could do to prepare ourselves was to make sure we documented the things that we found were important! We found that some of the most important things to know was your dogs' vaccines, medicines, and, gross or not, the poops! Our new dog-son's name is Zuko, so we created Zukies Dookies! </p>
                    <p>When using Zukies Dookies, you, yes you, will be able to add all of the dogs you care for. For each of those dogs, you will be able to add all of the vaccines that your dog has been given and when. You'll also be able to record all of the medicines that your vet tells you your dog friend will need to take regularly. And when you add those, you can keep track of how often these medicines need to be taken, too!</p>
                </div>
                <div>

                </div>
                <div>
                    <Button variant='contained' color='primary' onClick={() => this.showDogs()}>{this.state.showDogs ? <span>Minimize Dogs</span> : <span>Show Dogs</span>}</Button>
                    { this.state.showDogs ? <AllDogs /> : null }
                </div>
            </div>
        ) 
    }
}

export default Home