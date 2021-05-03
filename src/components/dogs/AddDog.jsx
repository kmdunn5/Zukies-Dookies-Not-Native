import React, { Component } from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import {baseUrl, api} from '../../baseUrl.js'

const useStyles = theme => ({
    textField: {
        'border-color': '#009ffdff',
    },
    submit: {
        'background-color': '#2a2a72ff',
        'margin-top': 20,
        'margin-bottom': 20,
        'max-width': 'fit-content'
    }
})

class AddDog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            birthday: '2021-01-01',
            breed: '',
            image: '',
            notes: '', 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        Axios.post(baseUrl + api + 'dogs/', 
        {
            name: this.state.name,
            birthday: this.state.birthday,
            breed: this.state.breed,
            // image: this.state.image,
            notes: this.state.notes
        },
            {withCredentials: true}
        ).then(res => {if (res.data.status.code === 201) {
            this.props.getUserDogs()
            }
        })
    }

    render() {
        const {classes} = this.props

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <Grid container justify='center' spacing={2}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            className={classes.textField}
                            label="Name"
                            name="name"
                            autoFocus
                            defaultValue={this.state.name}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            className={classes.textField}
                            name="birthday"
                            label="Birthday"
                            type="date"
                            id="birthday"
                            defaultValue={this.state.birthday}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            className={classes.textField}
                            name="breed"
                            label="Breed"
                            id="breed"
                            defaultValue={this.state.breed}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            className={classes.textField}
                            name="notes"
                            label="Notes"
                            id="notes"
                            defaultValue={this.state.notes}
                            onChange={this.handleChange}
                        />
                        {/* <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name}/>
                        <label htmlFor="birthday">Birthday: </label>
                        <input type="date" name="birthday" id="birthday" onChange={this.handleChange} value={this.state.birthday} min="2000-01-01" max="2100-12-31"/>
                        <label htmlFor="breed">Breed: </label>
                        <input type="text" name="breed" id="breed" onChange={this.handleChange} value={this.state.breed}/>
                        <label htmlFor="notes">Notes: </label>
                        <textarea name="notes" id="notes" onChange={this.handleChange} value={this.state.notes}/>
                        <input type="submit" value="Add Dog"/> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='primary'
                            className={classes.submit}
                        >
                            Add Dog
                        </Button>
                    </Grid>
                </Grid>
                    
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddDog)