import React, { Component } from 'react'
import Axios from 'axios'

import {baseUrl, api} from '../../baseUrl.js'

class MedicineUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicine: this.props.medicine,
            medicine_name: '',
            frequency: ''
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
                <form>
                    <label htmlFor="">Name</label>
                    <input type="text" name="" id=""/>
                    <label htmlFor="">Most Recent Date</label>
                    <input type="date" name="" id=""/>
                    <label htmlFor="">Frequency</label>
                    <input type="text" name="" id=""/>
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}

export default MedicineUpdate