import React, { useState } from 'react'

import Button from '@material-ui/core/Button'

import DogUpdate from './DogUpdate'

const dateParse = (d) => {
    let dateSplit = d.split('00')
    return dateSplit[0]
}

function DogInfo(props) {
    const [update, setUpdate] = useState(false)
    
    
    return (
        <div>
            <h1>Dog Info</h1>
            <h3>Birthday:</h3>
            <p>{dateParse(props.dog.birthday)}</p>
            <h3>Notes:</h3>
            <p>{props.dog.notes}</p>
            <Button onClick={() => {setUpdate(!update)}}>Update</Button>
            {update ? (<DogUpdate dog={props.dog}/>) : (null)}
        </div>
    )
}

export default DogInfo