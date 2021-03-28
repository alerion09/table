import React from 'react';
import {GrSave} from 'react-icons/gr';

const ColumnInputs = ({dataState, confirmColumnHandler, getInput, setHeaderName}) => {
    return (
        <div className='column-inputs-container'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div >
                                <div className='column-inputs-container-header'>
                                    <label>Header:</label>
                                    <button onClick={() => confirmColumnHandler()}><GrSave/></button>
                                </div>
                                <input type="text" name="header" onChange={(event)=>setHeaderName(event.target.value)}/>
                            </div>
                        </td>
                    </tr>
                        {dataState.map((element, index)=> {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input type="text" name={index} onChange={getInput}/>
                                    </td>  
                                </tr>
                            );
                        })}
                </tbody>  
            </table>
        </div>
    )
}

export default ColumnInputs
