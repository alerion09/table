import React from 'react';

const Navigation = (props) => {
    const {addRowHandler, addColumnHandler} = props;
    return (
        <nav>
            <button onClick={addRowHandler}>Add Row</button>
            <button onClick={addColumnHandler}>Add Column</button>
        </nav>
    )
} 
export default Navigation