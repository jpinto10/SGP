import React from 'react';
import './index.css';
import Logo from '../../assets/CMS_NOTFOUND.png';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';

const NotFound = (props) => {
    return (
        <div className='principal-container'>
            <div className='cabec_principal'>
                <Topo/>
            </div>
            <div className='body_NotFound'>
                <img src={Logo} alt='Logo da empresa'/>
                {props.children}
            </div>   
            <div className='rodape_principal'>
                <Rodape/>
            </div>      
        </div>
      );
}

export default NotFound