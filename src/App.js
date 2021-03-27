import React, {useEffect, useState} from 'react';
import Table from './Table';
import Order from './Order';
import Navigation from './Navigation';
import RowInputs from './RowInputs';
import ColumnInputs from './ColumnInputs';
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
  };
  
  const [dataState, setDataState] = useState(); //Contain fetched data
  const [headers, setHeaders] = useState([]); //Contain header cells data
  const [isOrder, setIsOrder] = useState(false); //boolean
  const [isRowInputs, setIsRowInputs] = useState(false);//boolean
  const [isColumnInputs, setIsColumnInputs] = useState(false);//boolean
  const [activeHeader, setActiveHeader] = useState(); //Contain name of active header
  const [inputColumnPosition, setInputColumnPosition] = useState(null); //Contain value of inserted number
  const [stickyColumns, setStickyColumns] = useState([]);

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

  const getHeaders = (data) => {
    setHeaders(Object.keys(data[0]));
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if(dataState){
      getHeaders(dataState);
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
    setDataState(newData);
    setIsOrder(false);      //Set dataState with new objects array
  };
  const orderHandler = (header) => {
    setInputColumnPosition();
    setActiveHeader(header);
    setIsOrder(!isOrder);
    setIsColumnInputs(false);
    setIsRowInputs(false);
  };
  const sortHandler = (header) => {
    let dataCopy = [...dataState]

    dataCopy.sort((a,b)=> {
      if  (a[header] < b[header]) {
        return -1;
      }
      if (a[header] > b[header]) {
        return 1;
      }
      return 0;
    });
    setDataState(dataCopy);
  };
  const columnPositionHandler = () => {
    changeColumnPosition(activeHeader, headers, inputColumnPosition, dataState);
    setIsOrder(false);  
  };
  const pinHandler = (header) => {
      if (!stickyColumns.includes(header)) {
        setStickyColumns((current)=> [...current, header]);
        changeColumnPosition(header, headers, 1, dataState);
      }
    };
    const addRowHandler = () => {
      
      const numberOfRowCells = headers.length;
      console.log(numberOfRowCells);
      setIsRowInputs(!isRowInputs);
      setIsColumnInputs(false);
    }
    const addColumnHandler = () => {
      const numberOfRows = dataState.length;
      console.log(numberOfRows);
      setIsColumnInputs(!isColumnInputs);
      setIsRowInputs(false);
    }
  // Function responsible for change column positon 
  const changeColumnPosition = (currentHeader, allHeaders, targetPosition, data) => {
    const numberOfHeaders = allHeaders.length;                        
    if  (targetPosition > numberOfHeaders || targetPosition < 1 || targetPosition==null) {
      console.log('error');
    } 
    else {
      const newData = [];                                               //Temporary array 
      data.map((elem) => {  
        const tempValue = elem[currentHeader];                          //Get value of current key
        delete elem[currentHeader];                                     //Delete the key
        const entries = Object.entries(elem);                           //Convert object to arrays
        entries.splice(targetPosition-1,0,[currentHeader, tempValue]);  //Insert key and value to array
        const newElem = Object.fromEntries(entries);                    //Convert arrays to object                                 
        return (                  
          newData.push(newElem)                                         //Push new element to temporary array
        )
      });
      setDataState(newData);                                            //set changed data
                                            
    };
  }
  if (dataState) {
    return (
      <TableContext.Provider value={{checkIsMatch}}>
        <div className='container'>
          {isOrder ? <Order columnPositionHandler={columnPositionHandler} activeHeader={activeHeader} setInputColumnPosition={setInputColumnPosition}/> 
          : <Navigation addRowHandler={addRowHandler} addColumnHandler={addColumnHandler}/>}
          {isRowInputs&&<RowInputs />}
          {isColumnInputs&&<ColumnInputs />}
          <Table headers={headers} dataState={dataState} closeHandler={closeHandler} orderHandler={orderHandler} sortHandler={sortHandler} pinHandler={pinHandler}/>
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
