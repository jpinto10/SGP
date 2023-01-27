import {useContext, useEffect, useState} from "react";
import React from "react";
import { AuthContext } from "../../contexts/auth";

import Logo from '../../assets/CMS.png';
import './index.css';

import Principal from "../Principal";

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loading } = useContext(AuthContext);

    const [obra, setObras] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault();
        debugger
        await signIn(usuario, senha);
        window.location.href = '/'
    };

    useEffect(()=>{
        setObras(obrasSelect)
    },[])
    
    const obrasSelect = [
        { value: '', name: 'Selecione uma obra' },
        { value: 1, name: 'OBRA-01'},
        { value: 2, name: 'OBRA-02'},
        { value: 3, name: 'OBRA-03'}
      ]

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
                    <select name="modulo">
                        <option label=" - ESCOLHA O MODULO - " />
                        <option label="CADASTROS" />
                        <option label="FINANCEIRO" />
                        <option label="ESTOQUE/CUSTOS" />
                        <option label="MAO-DE-OBRA" />
                    </select>
                    <select name="obra">
                        <option label=" - ESCOLHA A OBRA - " />
                        <option label="obra 01" />
                        <option label="obra 02" />
                    </select>
                    <button type='submit' >{loading?'Acessando...': 'Acessar'}</button>
                </form>
                <span>Esqueceu a senha!?</span>
            </div>
        </Principal>
        // </div>
      );
}

export default Login