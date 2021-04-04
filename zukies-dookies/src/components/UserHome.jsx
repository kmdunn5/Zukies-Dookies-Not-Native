import React, { Component } from 'react'
// import Axios from 'axios'

class UserHome extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.username}</h1>
            </div>
        )
    }
}

export default UserHome