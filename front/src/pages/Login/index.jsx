import * as React from "react";
import Logo from '../../assets/CMS.png';
import './index.css';

const Login = (props) => {
    return (
        <div className='principal'>
            <div className='login01 tootip'>
                <img src={Logo} alt='Logo Empresa' />
            </div>
            <div className='login02'>
                <form>
                    <h1>Acessar</h1>
                    <input type='text' placeholder="usuário"></input>
                    <input type='password' placeholder="senha"></input>
                    <button type='submit' >Confirmar</button>
                </form>
                <span>Esqueceu a senha!?</span>
            </div>
        </div>
      );
}

export default Login