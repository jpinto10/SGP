import {useContext, useState} from "react";
import React from "react";
import { AuthContext } from "../../contexts/auth";

import Logo from '../../assets/CMS.png';
import './index.css';

import Principal from "../Principal";

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loading } = useContext(AuthContext);
    
    async function handleSubmit(e){
        e.preventDefault();
        debugger
        await signIn(usuario, senha);
        window.location.href = '/'
    };
    

    return (
        // <div className='principal'>
        <Principal>
            {/* <div className='login01 tootip'>
                <img src={Logo} alt='Logo Empresa' />
            </div> */}
            <div className='login02'>
                <form onSubmit={handleSubmit}>
                    <h1>Acessar</h1>
                    <input type='text' placeholder="usuário" onChange={(e) => setUsuario(e.target.value)} ></input>
                    <input type='password' placeholder="senha" onChange={(e) => setSenha(e.target.value)}></input>
                    <button type='submit' >{loading?'Acessando...': 'Acessar'}</button>
                </form>
                <span>Esqueceu a senha!?</span>
            </div>
        </Principal>
        // </div>
      );
}

export default Login