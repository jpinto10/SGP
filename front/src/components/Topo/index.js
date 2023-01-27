import React from 'react';
import { Link } from 'react-router-dom';
import usuario from '../../assets/usuario.png'
import './style.css';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const Topo = () => {

  const { user, signed, signOut } = useContext(AuthContext);
  
  const isAdm = (user && user.Admin)

  const handleLogout = ()=>{
    signOut()
  }

  return (
    <header className="topo">
      <div className="topo-conteudo">
        <div className="topo-logo-box" to="/">
          <img onClick={handleLogout} className="topo-avatar" src={usuario} alt="usuário" title="usuario"/>
            {signed && 
              <p className="topo-nome-usuario">{' ' + user.nome + ' - ' + user.loja}</p>
            }
        </div>

        <nav className="topo-links">
          <Link className="topo-link" to="/">Home</Link>
          {signed && 
            <>
            <Link className="topo-link" to="/apontamento">Apontamento</Link>
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
          <Link className="topo-link" to="/">Troca Mudulo/Obra</Link>

        </nav>
      </div>
    </header>
  );
}

export default Topo;