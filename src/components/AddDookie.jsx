import React, { Component } from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const useStyles = theme => ({
    button: {
        'background-color': '#2a2a72ff',
        color: '#ffffffff',
        margin: '10px',
        'max-width': 'fit-content'
    }
})

let baseUrl

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000';
} else {
    baseUrl = 'https://zookies-dookies-backend.herokuapp.com';
};
let api = '/api/v1/'

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
        Axios.post(baseUrl + api + 'dookies/' + this.props.dog.id, 
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
        const { classes } = this.props

        return(
            <div>
                <p className='add-dookie-text'>Time to Add a Dookie! You can track whether this is a normal Dookie or an abnormal Dookie. If it's normal, we'll record everything else for you! <br /> <br /> Just so you know, we consider a normal Dookie to be brown in color, shapped like a log, have a compact consistency, be of an expected size, and contain nothing unusual. If you want to change any of those values for this poop, just select abnormal!</p>
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
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='primary'
                            className={classes.button}
                        >
                            Add Dog
                        </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddDookie)