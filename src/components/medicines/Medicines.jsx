import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import MedicineTable from './MedicineTable'
import AddMedicine from './AddMedicine'

const useStyles = makeStyles({
    button: {
        'background-color': '#2a2a72ff',
        color: '#ffffffff',
        margin: '10px'
    }
})

export default function Medicines(props) {
    const [add, setAdd] = useState(false)
    
    const classes = useStyles();
    
    return (
        <div>
            <Button className={classes.button} variant='contained' onClick={() => {setAdd(!add)}}>{add ? (<span>Cancel</span>):(<span>New Medicine</span>)}</Button>
            {add ? ( 
                <AddMedicine setAdd={setAdd} dog={props.dog}/>    
            ):(
                <MedicineTable dog={props.dog}/> 
            )}
        </div>
    )
}