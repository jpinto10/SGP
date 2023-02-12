import React from 'react';
import './index.css';
import Logo from '../../assets/CMS.png';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import Aside from '../../components/Aside';

const PrincipalGrig = (props) => {

    return (
            <div className='principal-container_grid'>
                <div >
                    <Topo/>
                </div>
                <div >
                    <Aside />
                </div>
                <div className='body_principal_grid'>
                    { !props.grid &&
                    <img className='imgPrincipal' src={Logo} alt='Logo da empresa'/>
                    }
                    {props.children}
                </div>
                
                <div className='rodape_principal_grid'>
                    <Rodape/>
                </div>
            </div>
      );
}

export default PrincipalGrig