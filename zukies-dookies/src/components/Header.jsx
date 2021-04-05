import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

let baseUrl = 'http://localhost:5000'
let api = '/api/v1/'

class Header extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    
    logOut() {
        Axios.get(baseUrl + api + 'caretakers/logout',
        {withCredentials: true})
    .then(res => {if (res.data.status.code === 200) {
        this.props.logOutUser()
    }})}
    
    render() {
        return (
            <nav>
                <Link to='/'><button>Zukies Dookies</button></Link>
                {this.props.loggedIn ? (
                <div>
                    <Link to='/user'><button>Home</button></Link>
                    <button onClick={this.logOut}>Log Out</button>
                </div>
                ) : (
                <div>
                    <Link to='/login'><button>Login</button></Link>
                    <Link to='/signup'><button>Sign Up</button></Link>
                </div>
                )}
            </nav>
        )
    }
}

export default Header