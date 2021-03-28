import React, {useEffect, useState} from 'react';
import Table from './Table';
import Order from './Order';
import Navigation from './Navigation';
import RowInputs from './RowInputs';
import ColumnInputs from './ColumnInputs';
import PageNavigation from './PageNavigation';
export const regexDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/; // Regex ISO date format
export const TableContext = React.createContext();
const url = 'https://raw.githubusercontent.com/alerion09/data/main/table-data'; //API URL

function App() {

  //STATES-------------------------------
  const [dataState, setDataState] = useState(); //Contains fetched data
  const [headers, setHeaders] = useState([]); //Contains header cells data
  const [isOrder, setIsOrder] = useState(false); //boolean
  const [isRowInputs, setIsRowInputs] = useState(false);//boolean
  const [isColumnInputs, setIsColumnInputs] = useState(false);//boolean
  const [activeHeader, setActiveHeader] = useState(); //Contains name of active header
  const [inputColumnPosition, setInputColumnPosition] = useState(null); //Contains value of inserted number of column by user
  const [stickyColumns, setStickyColumns] = useState([]); //Contains data of sticky Column
  const [inputsData, setInputsData] = useState(); //Contains OBJECT with inputs names and values 
  const [headerName, setHeaderName] = useState(); //Contains name of header
  const [amountOfDisplayData, setAmountOfDisplayData] = useState(8); //Contains number of items to display
  const [counterOfDisplayData, setCounterOfDisplayData] = useState(8); //Counter 
  
  //Function get data from API and set to dataState
  const fetchData = async  () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataState(data);
    } 
    catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  //If dataState has changes then run getHeaders function
  useEffect(() => {
    if(dataState){
      getHeaders(dataState);
    };
  }, [dataState]);

  //Function getting headers from first item of data
  const getHeaders = (data) => {
    setHeaders(Object.keys(data[0]));
  };
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
        );
      });
      setDataState(newData);                                            //set changed data              
    };
  };
  // Function responible for remove specific column
  const closeHandler = (header) => { 
    const newData = [];         //Temporary array for objects without specific properties
    dataState.map((elem) => {   //map every element of dataState
      delete elem[header];      //delete specific property of object
      return (                  
        newData.push(elem)     //Add changed element to temporary array
      );
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
  //Sorting function in Handler 
  const sortHandler = (header) => {
    let dataCopy = [...dataState];
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
      };
    };
  const addRowHandler = () => {
    setIsRowInputs(!isRowInputs);
    setIsColumnInputs(false);
    setInputsData();
  };
  const addColumnHandler = () => {
    setIsColumnInputs(!isColumnInputs);
    setIsRowInputs(false);
    setInputsData();
  };
  //Function get value and name from inputs and set them as object
  const getInput = (event) => {
    const target = event.target;
    const name = event.target.name;
    setInputsData((current) => {
      return (
        {...current,[name]:target.value}
      );
    });
  };
  const confirmRowHandler = () => {
    if (inputsData == null) {
      console.log('error');
    }
    else {
      const headersCopy = [...headers];
      headersCopy.map((element, index) => {
        return (
        headersCopy[index] = (inputsData[index])||''    //If element in inputsData doesnt exist then push empty string
        );
      });
      const newHeaders = Object.assign({},headersCopy);
      const entries = Object.entries(newHeaders);
      for (let i = 0; i < entries.length; i++) {
        entries[i][0] = headers[i]
      }
      const resultantRow = Object.fromEntries(entries);  
      setDataState((current) => {
        return (
          [...current, resultantRow]
        );
      });
      setIsRowInputs(false);
      setInputsData();
    };
  };
  const confirmColumnHandler = () => {
    if (inputsData == null || headerName == null) {
      console.log('error');
    }
    else {
      const dataCopy = [...dataState];
      dataCopy.map((element, index) => {
        return (
         element[headerName] = (inputsData[index])||'' //If element in inputsData doesnt exist then push empty string
        );
      });
      setDataState(dataCopy);
      setIsColumnInputs(false);
      setHeaderName();
      setInputsData();
    };
  };
  //More button handler
  const moreHandler = () => {
    setAmountOfDisplayData(amountOfDisplayData+counterOfDisplayData);
  }
  if (dataState) {
    return (
      <TableContext.Provider value={{checkIsMatch}}>
        <div className='container'>
          {isOrder ? <Order columnPositionHandler={columnPositionHandler} activeHeader={activeHeader} setInputColumnPosition={setInputColumnPosition}/> 
          : <Navigation addRowHandler={addRowHandler} addColumnHandler={addColumnHandler}/>}
          {isRowInputs&&<RowInputs headers={headers} confirmRowHandler={confirmRowHandler} getInput={getInput} inputsData={inputsData}/>}
          {isColumnInputs&&<ColumnInputs dataState={dataState} confirmColumnHandler={confirmColumnHandler} getInput={getInput} setHeaderName={setHeaderName}/>}
          <Table headers={headers} dataState={dataState} closeHandler={closeHandler} orderHandler={orderHandler} sortHandler={sortHandler} 
          pinHandler={pinHandler} amountOfDisplayData={amountOfDisplayData}/>
          {dataState.length > amountOfDisplayData&&<PageNavigation moreHandler={moreHandler}/>}
          
        </div>
      </TableContext.Provider>
    );
  }
  else {
    return (
      <>
        <div className='loading-container'>
          <h2>Loading...</h2>
        </div> 
      </>
    );
  };
};

export default App;
