import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AllDogs from './components/AllDogs'
import UserHome from './components/UserHome'
import { Switch, Route } from 'react-router'

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      role: 'lurker'
    }
  }

  setUser(user) {
    this.setState({
      username: user.username,
      role: user.role
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/signup' render={(props) => <SignUp {...props} setUser={this.setUser} /> } />
          <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser} /> } />
          <Route exact path='/allDogs' component={ AllDogs } />
          <Route path='/:userId' render={(props) => <UserHome {...props} role={this.state.role} username={this.state.username} />}/>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App;
