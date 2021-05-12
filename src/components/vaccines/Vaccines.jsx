import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import VaccineTable from './VaccineTable'
import AddVaccine from './AddVaccine'

const useStyles = makeStyles({
    button: {
        'background-color': '#2a2a72ff',
        color: '#ffffffff',
        margin: '10px'
    }
})

export default function Vaccines(props) {
    const [add, setAdd] = useState(false)
    
    const classes = useStyles();
    
    return (
        <div>
            <Button className={classes.button} variant='contained' onClick={() => {setAdd(!add)}}>{add ? (<span>Cancel</span>):(<span>New Vaccine</span>)}</Button>
            {add ? ( 
                <AddVaccine dog={props.dog}/>    
            ):(
                <VaccineTable dog={props.dog}/> 
            )}
        </div>
    )
}