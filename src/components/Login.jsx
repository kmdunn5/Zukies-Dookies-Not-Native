import React, { Component } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = theme => ({
    textField: {
        'border-color': '#009ffdff',
    },
    submit: {
        'background-color': '#2a2a72ff'
    }
});

let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies.herokuapp.com';
};
let api = '/api/v1/'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            noUser: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({noUser: false})

        Axios.post(baseUrl + api + 'caretakers/login',
            {
                username: this.state.username,
                password: this.state.password
            },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 200) {
            this.props.setUser()
            this.props.history.push('/user')
        }
        else {
            this.setState({
                noUser: true
            })
        }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>Log In</h1>
                {this.state.noUser ? (<p className='error'>Username and Password do not match</p>) : (null)}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        className={classes.textField}
                        label="Username"
                        name="username"
                        autoFocus
                        defaultValue={this.state.username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        className={classes.textField}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        defaultValue={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(Login)