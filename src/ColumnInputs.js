import React from 'react';
import {GrSave} from 'react-icons/gr';

const ColumnInputs = ({dataState, confirmColumnHandler, getInput, setHeaderName}) => {
    return (
        <div className='column-inputs-container'>
            <div className='column-inputs-container-inside'>
                <div className='column-inputs-container-header'>
                    <label>Header:</label>
                    <button onClick={() => confirmColumnHandler()}><GrSave/></button>
                </div>
                <div className='column-inputs-container-header-input'>
                    <input type="text" name="header" onChange={(event)=>setHeaderName(event.target.value)}/>
                </div>
                {dataState.map((element, index)=> {
                    return (
                        <div key={index} className='column-inputs-container-input'>
                                <input type="text" name={index} onChange={getInput}/>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ColumnInputs
