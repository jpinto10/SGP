import React from 'react';
import './index.css';
import Logo from '../../assets/CMS.png';

const NotFound = (props) => {
    return (
            <div className='NotFound-container'>
                
                <div className='body'>
                    <img src={Logo} alt='Logo da empresa'/>
                    {props.children}
                </div>
                
            </div>
      );
}

export default NotFound