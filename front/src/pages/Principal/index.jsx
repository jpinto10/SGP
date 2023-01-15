import React from 'react';
import './index.css';
import Logo from '../../assets/CMS.png';


const Principal = (props) => {
    return (
            <div className='principal-container'>
                <div className='cabec'>
                    cabec
                </div>
                
                <div className='body'>
                    <img src={Logo} alt='Logo da empresa'/>
                    {props.children}
                </div>
                
                <div className='rodape'>
                    rodape
                </div>
            </div>
      );
}

export default Principal