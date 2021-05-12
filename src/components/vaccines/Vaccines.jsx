import React from 'react'
import VaccineTable from './VaccineTable'

function Vaccines(props) {
    

    
    return (
        <div>
            <VaccineTable dog={props.dog}/>
        </div>
    )
}

export default Vaccines