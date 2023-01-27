
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './style.css';
import { IconContext } from 'react-icons';

const Aside = () =>{
 
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <ul className='nav-menu-items' >
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
        </IconContext.Provider>
      </>
    );
  }
export default Aside;