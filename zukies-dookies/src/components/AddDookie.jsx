import React, { Component } from 'react'
import Axios from 'axios'

let baseUrl = 'http://localhost:5000/'
let api = 'api/v1/'
let path = window.location.pathname
let pathSplit = path.split('/')

class AddDookie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            abnormal: false,
            food: '',
            color: 'brown',
            shape: 'log',
            consistency: 'compact',
            size: 'expected',
            content: 'nothing unusual'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRadio = this.handleRadio.bind(this)
        this.addDookie = this.addDookie.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRadio(e) {
        if (e.target.id === 'true') {
            this.setState({
                [e.target.name]: true
            })
        } else if (e.target.id === 'false') {
            this.setState({
                [e.target.name]: false
            })
        }
    }

    addDookie(e) {
        e.preventDefault()
        Axios.post(baseUrl + api + 'dookies/' + pathSplit[pathSplit.length - 1], 
            {
            abnormal: this.state.abnormal,
            food: this.state.food,
            color: this.state.color,
            shape: this.state.shape,
            consistency: this.state.consistency,
            size: this.state.size,
            content: this.state.size
            },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.renderAddForm()
        }})
    }

    render() {
        return(
            <div>
                <p>Time to Add a Dookie! You can track whether this is a normal Dookie or an abnormal Dookie. If it's normal, we'll record everything else for you! <br /> Just so you know, we consider a normal Dookie to be brown in color, shapped like a log, have a compact consistency, be of an expected size, and contain nothing unusual. If you want to change any of those values for this poop, just select abnormal!</p>
                <form onSubmit={this.addDookie}>
                    <label htmlFor="food">Food: </label>
                    <input type="text" name="food" id="food" value={this.state.food} onChange={this.handleChange} required/>
                    <div>
                        <p>Normal Dookie?</p>
                        <label htmlFor="false">Normal</label>
                        <input type="radio" name="abnormal" id="false" onChange={this.handleRadio}/>
                        <label htmlFor="true">Abnormal</label>
                        <input type="radio" name="abnormal" id="true" onChange={this.handleRadio}/>
                    </div>
                    {this.state.abnormal ? (
                    <div>
                        <label htmlFor="color">Color: </label>
                        <input type="text" name="color" id="color" value={this.state.color} onChange={this.handleChange}/>
                        <label htmlFor="shape">Shape: </label>
                        <input type="text" name="shape" id="shape" value={this.state.shape} onChange={this.handleChange}/>
                        <label htmlFor="consistency">Consistency: </label>
                        <input type="text" name="consistency" id="consistency" value={this.state.consistency} onChange={this.handleChange}/>
                        <label htmlFor="size">Size: </label>
                        <input type="text" name="size" id="size" value={this.state.size} onChange={this.handleChange}/>
                        <label htmlFor="content">Content: </label>
                        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
                    </div>
                    ) : (
                    <div>
                        <input type="text" name="color" id="color" value={this.state.color} onChange={this.handleChange} hidden/>
                        <input type="text" name="shape" id="shape" value={this.state.shape} onChange={this.handleChange} hidden/>
                        <input type="text" name="consistency" id="consistency" value={this.state.consistency} onChange={this.handleChange} hidden/>
                        <input type="text" name="size" id="size" value={this.state.size} onChange={this.handleChange} hidden/>
                        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange} hidden/>
                    </div>
                    )}
                    <input type="submit" value="Add Dookie"/>
                </form>
            </div>
        )
    }
}

export default AddDookie