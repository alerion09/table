import React from 'react';

const Navigation = (props) => {
    const {addRowHandler, addColumnHandler} = props;
    return (
        <div className='navigation-container'>
            <button onClick={addRowHandler}>Add Row</button>
            <button onClick={addColumnHandler}>Add Column</button>
        </div>
    )
} 
export default Navigation