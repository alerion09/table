import React from 'react';
import {GrSave} from 'react-icons/gr'
const Order = ({columnPositionHandler, activeHeader, setInputColumnPosition}) => {
    
    return (
        <div className='column-position-container'>
            <label htmlFor="column-position">New position <span>{activeHeader}</span>:</label>
            <input type="number" name="column-position" id="column-position" onChange={(event) => setInputColumnPosition(event.target.value)}/>
            <button onClick={() => columnPositionHandler()}><GrSave /></button>
        </div>
    )
} 
export default Order