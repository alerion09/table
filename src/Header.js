import React from 'react';
import {BiSort} from 'react-icons/bi';
import {CgClose} from 'react-icons/cg';
import {HiOutlineSwitchHorizontal} from 'react-icons/hi';
import {RiPushpin2Line} from 'react-icons/ri';

const Header = ({header, index, orderHandler, closeHandler, sortHandler, pinHandler}) => {
    
    return (
        <th key={index} id={`header${index}`}>
            <div className='header-cell'>
                <div className='header-cell-name-pin'>
                    <span>{header}</span>
                    <button id={`pin-${header}`} onClick={()=> pinHandler(header)}><RiPushpin2Line /></button>
                </div>
                <div className='header-cell-icons'>
                    <button onClick={()=> sortHandler(header)}><BiSort /></button>
                    <button onClick={()=> orderHandler(header)}><HiOutlineSwitchHorizontal /></button>
                    <button onClick={()=> closeHandler(header)}><CgClose /></button>
                </div> 
            </div>
        </th>
    );
}; 
export default Header;