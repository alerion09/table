import React from 'react';
import {BiSort} from 'react-icons/bi';
import {CgClose} from 'react-icons/cg';
import {HiOutlineSwitchHorizontal} from 'react-icons/hi';

const Header = ({header, index, orderHandler, closeHandler}) => {
    
    return (
        <th key={index} id={`header${index}`}>
            <div className='header-cell'>
                <span>{header}</span>
                <div className='header-cell-icons'>
                    <button><BiSort /></button>
                    <button onClick={()=> orderHandler(header)}><HiOutlineSwitchHorizontal /></button>
                    <button onClick={()=> closeHandler(header)}><CgClose /></button>
                </div> 
            </div>
        </th>
    )
}; 
export default Header;