import React from 'react';
import Row from './Row';
import Header from './Header';

const Table = ({headers, dataState, closeHandler, orderHandler}) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => {
                        return (
                            <Header key={index} header={header} index={index} closeHandler={closeHandler} orderHandler={orderHandler}/>
                        );
                    })}
                </tr>
            </thead>  
            <tbody>
                {dataState.map((object, index) => {
                    return(
                        <Row key={index} id={index} object={object}/>
                    );
                })}
            </tbody>

        </table>
    )
};
export default Table;