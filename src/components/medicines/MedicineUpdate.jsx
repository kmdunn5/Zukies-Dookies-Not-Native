import React, { Component } from 'react'
import Axios from 'axios'

class MedicineUpdate extends Component {
    render() {
        return (
            <div>
                <p>Update {this.props.data.medicine_name}</p>
            </div>
        )
    }
}

export default MedicineUpdate