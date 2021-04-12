import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const useStyles = theme => ({
    button: {
      color: '#ffffffff',
      'font-weight': 600
    },
    appBar: {
        'background-color': '#2a2a72ff',
        'min-height': '60px',
        'flex-direction': 'column',
        // 'align-items': 'center'
    }
});


let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies-backend.herokuapp.com';
};
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
        const { classes } = this.props;

        return (
            <AppBar position='static' className={classes.appBar}>
                {/* <div className='logo'>Zookies Dookies</div> */}
                <div className='nav-buttons'>
                    <div className='home-page'>
                        <Link to='/'><Button className={classes.button}>Zookies Dookies</Button></Link>
                    </div>
                    {this.props.loggedIn ? (
                    <div>
                        <div className='user-home'>
                            <Link to='/user'><Button className={classes.button}>Home</Button></Link>
                        </div>
                        <div className='login-info'>
                            <Button className={classes.button} onClick={this.logOut}>Log Out</Button>
                        </div>
                    </div>
                    ) : (
                    <div className='login-info'>
                        <Link to='/login'><Button className={classes.button}>Login</Button></Link>
                        <Link to='/signup'><Button className={classes.button}>Sign Up</Button></Link>
                    </div>
                    )}
                </div>
            </AppBar >
        )
    }
}

export default withStyles(useStyles)(Header)
// export default Header