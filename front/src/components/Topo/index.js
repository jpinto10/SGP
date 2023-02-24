import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usuario from '../../assets/usuario.png'
import './style.css';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const Topo = () => {

  const { user, signOut, signed } = useContext(AuthContext);
  const isAdm = (user && user.adm)

  const handleLogout = (event)=>{
    signOut(event)
  }

  return (
    <header className="topo">
      <div className="topo-conteudo">
        <div className="topo-logo-box" to="/">
          <img onClick={handleLogout} className="topo-avatar" src={usuario} alt="usuário" title="usuario"/>
            {signed && 
              <p className="topo-nome-usuario">{'  - ' + user.nome }</p>
            }
        </div>

        <nav className="topo-links">
          <Link className="topo-link" to="/">Home</Link>
          {signed && 
            <>
              <Link className="topo-link" to="/">Trocar Módulo/Obra</Link>
            </>
          }

          {!signed && 
            <>
            <Link className="topo-link" to="/login">Entrar</Link>
            </>
          }
          {
            isAdm === 'SIM' &&
            <>
            <Link className="topo-link" to="/usuarios">Usuarios</Link>
            </>
          }

        </nav>
      </div>
    </header>
  );
}

export default Topo;