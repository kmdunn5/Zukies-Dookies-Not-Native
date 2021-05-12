import React from 'react'
import MedicineTable from './MedicineTable'

function Medicines(props) {
    
    
    
    return (
        <div>
            <MedicineTable dog={props.dog} />
        </div>
    )
}

export default Medicines