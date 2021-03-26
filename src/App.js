import React, {useEffect, useState} from 'react';
import Table from './Table';

import Order from './Order';
import Navigation from './Navigation';
export const regexDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/; // Regex ISO date format
export const TableContext = React.createContext();
const url = 'https://e5a2cd5d-34bf-4638-a3ae-44eb2d3838b5.mock.pstmn.io/data/'; //API URL

function App() {

  //Function check is value match to regex format - if do, then return a human friendly formated date
  const checkIsMatch = (value) => {
    const stringValue = value.toString();
    if  (stringValue.match(regexDate)) {
      const date = new Date(value);
      return (date.toLocaleString());
    }
    else {
      return value;
    }
  }
  
  const [dataState, setDataState] = useState(); //Contain fetched data
  const [headers, setHeaders] = useState([]); //Contain header cells data
  const [isOrder, setIsOrder] = useState(false); //boolean
  
  const fetchData = async  () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataState(data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const getHeaders = () => {
    setHeaders(Object.keys(dataState[0]));
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if(dataState){
      getHeaders();
    }
  }, [dataState]);

  // Function responible for remove specific column
  const closeHandler = (header) => { 
    const newData = [];         //Temporary array for objects without specific properties
    dataState.map((elem) => {   //map every element of dataState
      delete elem[header];      //delete specific property of object
      return (                  
        newData.push(elem)      //Add changed element to temporary array
      )
    });
    setDataState(newData);      //Set dataState with new objects array
  }
  const orderHandler = (header) => {
    console.log(header);
  };
  if (dataState) {
    return (
      <TableContext.Provider value={{checkIsMatch}}>
        <div className='container'>
          {/* <Navigation addRowHandler={addRowHandler} addColumnHandler={addColumnHandler}/> */}
          <Order />
          <Table headers={headers} dataState={dataState} closeHandler={closeHandler} orderHandler={orderHandler}/>
        </div>
      </TableContext.Provider>
    );
  }
  else {
    return (
      <>
        Loading...
      </>
    )
  }
  
}

export default App;
