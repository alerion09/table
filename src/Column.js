import React, {useContext} from 'react';
import {TableContext} from './App';

const Column = ({value, id}) => {
    const {checkIsMatch} = useContext(TableContext);
    return (
        <td id={id}>
            {checkIsMatch(value)}
        </td>
    )
} 
export default Column