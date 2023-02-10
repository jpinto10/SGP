import React from 'react';
import './index.css';
import Logo from '../../assets/CMS.png';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import Aside from '../../components/Aside';

const Principal = (props) => {

    return (
            <div className='principal-container'>
                <div >
                    <Topo/>
                </div>
                <div >
                    <Aside />
                </div>
                <div className='body_principal'>
                    { !props.grid &&
                    <img className='imgPrincipal' src={Logo} alt='Logo da empresa'/>
                    }
                    {props.children}
                </div>
                
                <div className='rodape_principal'>
                    <Rodape/>
                </div>
            </div>
      );
}

export default Principal