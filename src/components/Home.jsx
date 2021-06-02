import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

import AllDogs from './dogs/AllDogs'

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
                <h1 className='title'>Welcome to Zookies Dookies!</h1>
                <h2>Use username: <span>example</span> and password: <span>password</span> to test the app out!</h2>
                <div className='description'>
                    <p className='description description1'>Here, you can keep track of some of the medical needs of your dog friend or friends. This site was created because my partner and I are both new to being dog parents. Not knowing much about pet care, we decided that the best thing we could do to prepare ourselves was to make sure we documented the things that we found were important! We found that some of the most important things to know was your dogs' vaccines, medicines, and, gross or not, the poops! Our new dog-son's name is Zuko, so we created Zookies Dookies! </p>
                    <p>When using Zookies Dookies, you, yes you, will be able to add all of the dogs you care for. For each of those dogs, you will be able to add all of the vaccines that your dog has been given and when. You'll also be able to record all of the medicines that your vet tells you your dog friend will need to take regularly. And when you add those, you can keep track of how often these medicines need to be taken, too!</p>
                    <p>Finally, your daily use of this app will be to keep track of your dogs poops. This is a big indicator of how healthy your dog is. In order to make this easier, normally you will only have to record that it was a normal poop. We take care of the rest! We record the date of the poop, consistency, color, size, shape, and content. If there is anything different than normal, you will be able to say that it is an abnormal poop, and then fill in what was different. Kind of cool! The other thing this lets you do is figure out what foods are best for your pet. Because, yes, we keep track of that too!</p>
                    <p>Hopefully this will allow you to keep better track of your dogs' health. And by doing that, in the unfortunate case that you have to go to your vet, all of the information you need will be at your fingertips!</p>
                </div>
                <div>
                    <p>And if you don't have a pup, feel free to look at pictures of other dogs! Because sometimes you just need to see some cute pups!</p>
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