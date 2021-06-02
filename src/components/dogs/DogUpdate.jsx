import React, { Component } from 'react'

class UpdateDog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: this.props.dog
        }
    }

    render() {
        return (
            <div>
                <h1>Dog Update (under construction)</h1>
            </div>
        )
    }
}

export default UpdateDog