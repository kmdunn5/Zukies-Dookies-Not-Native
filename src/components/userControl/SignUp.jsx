import React, { Component } from 'react'
import Axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {baseUrl, api} from '../../baseUrl.js'

const useStyles = theme => ({
    textField: {
        'border-color': '#009ffdff',
    },
    submit: {
        'background-color': '#2a2a72ff',
        'margin-top': 20,
        'max-width': 'fit-content'
    }
})

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            role: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'caretakers/register',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.setUser()
            this.props.history.push('/user')
        }})
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h1>Sign Up!</h1>

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
                        autoComplete="username"
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
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        defaultValue={this.state.email}
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
                    {/* <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={this.handleChange} value={this.state.username}/>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password}/> */}
                    <div>
                        <p>I am a dog... (select one)</p>
                        <input type="radio" name="role" id="role-owner" value="owner" onChange={this.handleChange}/>
                        <label htmlFor="role-owner">Owner</label>
                        <input type="radio" name="role" id="role-caretaker" value="caretaker" onChange={this.handleChange}/>
                        <label htmlFor="role-caretaker">Caretaker/Walker/Friend</label>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    {/* <input type="submit" value="Log In"/> */}
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(SignUp)