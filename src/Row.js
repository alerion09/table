import React from 'react';
import Column from './Column';


const Row = ({object, id}) => {
    let keys = Object.keys(object);

    return (
        <tr id={`row${id}`}>
            {keys.map((key, index) =>{
                const value = object[key];
                return (
                    <Column key={index} value={value} id={`row${id}column${index}`}></Column>
                );
            })}
        </tr>
        
    )
} 
export default Row