import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UserHome from './components/UserHome'
import DogShow from './components/DogShow'
import { Switch, Route, Redirect } from 'react-router'
import './App.css'

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: '',
      role: 'lurker'
    }
    this.setUser = this.setUser.bind(this)
    this.logOutUser = this.logOutUser.bind(this)
  }

  setUser(user) {
    this.setState({
      loggedIn: true,
      username: user.username,
      role: user.role
    })
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
      <div className='content'>
        <Header logOutUser={this.logOutUser} loggedIn={this.state.loggedIn}/>

        {!this.state.loggedIn ? <Redirect to='/' /> : null }

        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/signup' render={(props) => <SignUp {...props} setUser={this.setUser} /> } />
          <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser} /> } />
          <Route path='/user' render={(props) => <UserHome {...props} role={this.state.role} username={this.state.username} />}/>
          <Route path='/dog/:dogId' render={(props) => <DogShow {...props} role={this.state.role} />} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App;
