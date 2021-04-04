import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <nav>
                <Link to='/'><button>Home</button></Link>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
                <button>Log Out</button>
            </nav>
        )
    }
}

export default Header