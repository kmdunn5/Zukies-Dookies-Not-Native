import React, { Component } from 'react'
import Axios from 'axios'

import {baseUrl, api} from '../../baseUrl.js'

class MedicineUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicine: this.props.medicine,
            medicine_name: ''
        }
    }

    updateMed(e) {
        e.preventDefault()

        Axios.put()
    }

    render() {
        return (
            <div>
                <p>Update {this.props.data.medicine_name}</p>
            </div>
        )
    }
}

export default MedicineUpdate