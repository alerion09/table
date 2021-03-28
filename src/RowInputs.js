import React from 'react';
import {GrSave} from 'react-icons/gr';
const RowInputs = ({headers, confirmRowHandler, getInput, inputsData}) => {
    return (
        <div className='row-inputs-container'>
            <table>
                <tbody>
                    <tr>
                        {headers.map((element, index)=> {
                            return (
                                <td key={index}>
                                    <input type="text" name={index} onChange={getInput} />
                                </td>
                            );
                        })}
                        <td>
                            <button onClick={() => confirmRowHandler()}><GrSave/></button>
                        </td>
                    </tr>
                </tbody>  
            </table>
        </div>
    );
};
export default RowInputs;
