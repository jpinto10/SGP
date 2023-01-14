import * as React from "react";
import Logo from '../../assets/LOGO.png';
import './index.css';

const Login = (props) => {
    return (
        <div className='principal'>
            <div className='login01 tootip'>
                <img src={Logo} alt='Logo Empresa' />
                <h2>SGP - SISTEMA DE GESTÃO PINTO </h2>
                <h4>JPINTO - CONSULTORIA</h4>
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