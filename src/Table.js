import React from 'react';
import Row from './Row';
import Header from './Header';

const Table = ({headers, dataState, closeHandler, orderHandler, sortHandler, pinHandler, amountOfDisplayData}) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => {
                        return (
                            <Header key={index} header={header} index={index} closeHandler={closeHandler} orderHandler={orderHandler} sortHandler={sortHandler} pinHandler={pinHandler}/>
                        );
                    })}
                </tr>
            </thead>  
            <tbody>
                {dataState.slice(0,amountOfDisplayData).map((object, index) => {
                    return(
                        <Row key={index} id={index} object={object}/>
                    );
                })}
            </tbody>

        </table>
    )
};
export default Table;