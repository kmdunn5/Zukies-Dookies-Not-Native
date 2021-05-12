import React, { useState } from 'react'

import Button from '@material-ui/core/Button'

import DogUpdate from './DogUpdate'

function DogInfo(props) {
    const [update, setUpdate] = useState(false)
    
    
    return (
        <div>
            <h1>Dog Info</h1>
            <Button onClick={() => {setUpdate(!update)}}>Update</Button>
            {update ? (<DogUpdate dog={props.dog}/>) : (null)}
        </div>
    )
}

export default DogInfo