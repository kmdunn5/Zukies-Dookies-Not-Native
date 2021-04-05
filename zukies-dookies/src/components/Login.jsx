import React, { Component } from 'react'
import Axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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

        Axios.post('http://localhost:5000/api/v1/caretakers/login',
            {
                username: this.state.username,
                password: this.state.password
            },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 200) {
            this.props.setUser(res.data.data)
            this.props.history.push('/user')
        }})
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={this.handleChange} value={this.state.username}/>
                    <label htmlFor="">Password: </label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password}/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        )
    }
}

export default Login