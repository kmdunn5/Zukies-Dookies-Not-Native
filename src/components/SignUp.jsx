import React, { Component } from 'react'
import Axios from 'axios'

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

        Axios.post('http://localhost:5000/api/v1/caretakers/register',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 200) {
            this.props.setUser()
            this.props.history.push('/' + res.data.data.id)
        }})
    }

    render() {
        return (
            <div>
                <h1>Sign Up!</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={this.handleChange} value={this.state.username}/>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password}/>
                    <div>
                        <p>Are you an Owner or a caretaker?</p>
                        <input type="radio" name="role" id="role-owner" value="owner" onChange={this.handleChange}/>
                        <label htmlFor="role-owner">Owner</label>
                        <input type="radio" name="role" id="role-caretaker" value="caretaker" onChange={this.handleChange}/>
                        <label htmlFor="role-owner">Caretaker/Walker/Friend</label>
                    </div>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        )
    }
}

export default SignUp