import React from 'react';
import {GrSave} from 'react-icons/gr'
const Order = () => {
    
    return (
        <div className='column-position-container'>
            <label htmlFor="column-position">Entry column position:</label>
            <input type="text" name="column-position" id="column-position"/>
            <button><GrSave /></button>
        </div>
    )
} 
export default Order