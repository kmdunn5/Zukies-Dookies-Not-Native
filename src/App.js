import React, { Component } from 'react'
import Axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UserHome from './components/UserHome'
import DogShow from './components/DogShow'
import { Switch, Route, Redirect } from 'react-router'
import './App.css'

let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.API_URL;
} else {
  baseUrl = 'http://localhost:5000';
};
let api = '/api/v1/'

console.log(baseUrl)

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: '',
      role: 'lurker'
    }
    this.setUser = this.setUser.bind(this)
    this.logOutUser = this.logOutUser.bind(this)
  }

  setUser() {
    Axios.get(baseUrl + api + 'caretakers/', 
      {withCredentials: true}
    ).then(res => {if (res.data.id > 0) {
      this.setState({
        user: res.data,
        loggedIn: true,
        role: res.data.role
      })
    }})
  }

  logOutUser() {
    this.setState({
      loggedIn: false,
      username: '',
      role: 'lurker'
    })
  }

  render() {
    return (
      <div className='main'>
        <Header logOutUser={this.logOutUser} loggedIn={this.state.loggedIn}/>

        {!this.state.loggedIn ? <Redirect to='/' /> : null }
        <div className='content content-wrap'>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/signup' render={(props) => <SignUp {...props} setUser={this.setUser} /> } />
            <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser} /> } />
            <Route exact path='/user' render={(props) => <UserHome {...props} user={this.state.user} />}/>
            <Route exact path='/dog/:dogId' render={(props) => <DogShow {...props} user={this.state.user} />} />
          </Switch>
        </div>
          <Footer />
      </div>
    )
  }
}

export default App;
