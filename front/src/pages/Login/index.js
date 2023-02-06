import {useContext, useEffect, useState} from "react";
import React from "react";
import { AuthContext } from "../../contexts/auth";

import { ToastContainer, toast  } from 'react-toastify';

import Logo from '../../assets/CMS.png';
import './index.css';

import Principal from "../Principal";

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loading } = useContext(AuthContext);

    const [modulo, setModulo] = useState('')
    const [obra, setObras] = useState('')

    //função para pegar a opção de escolha de obra.. no select
    function hendleObra(e){
        e.preventDefault();
        setObras(e.target.value)
    }
    
    //função para pegar a opção de módulo.. no select
    function hendleModulo(e){
        e.preventDefault();
        setModulo(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault();
        debugger        
        if(usuario.length===0){
            toast("Usuário não Digitado.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        if(senha.length===0){
            toast("Senha não Digitada.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        if(modulo.length===0){
            toast("Mudulo não escolhido.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        if(obra.length===0){
            toast("Usuário não Digitado.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        await signIn(usuario, senha, modulo, obra);
        window.location.href = '/'
    };

    useEffect(()=>{
        setObras(obrasSelect)
    },[])
    
    const obrasSelect = [
        { value: '', name: '- ESCOLHA A OBRA -' },
        { value: 1, name: 'OBRA-01'},
        { value: 2, name: 'OBRA-02'},
        { value: 3, name: 'OBRA-03'},
        { value: 4, name: 'OBRA-04'},
        { value: 1, name: 'OBRA-05'},
        { value: 2, name: 'OBRA-06'},
        { value: 3, name: 'OBRA-07'},
        { value: 4, name: 'OBRA-08'},
        { value: 1, name: 'OBRA-09'},
        { value: 2, name: 'OBRA-10'},
        { value: 3, name: 'OBRA-11'},
        { value: 4, name: 'OBRA-12'},
        { value: 5, name: 'OBRA-13'},
        { value: 1, name: 'OBRA-14'},
        { value: 2, name: 'OBRA-15'},
        { value: 3, name: 'OBRA-16'},
        { value: 4, name: 'OBRA-17'},
        { value: 1, name: 'OBRA-18'},
        { value: 2, name: 'OBRA-19'},
        { value: 3, name: 'OBRA-20'},
        { value: 4, name: 'OBRA-21'},
        { value: 1, name: 'OBRA-22'},
        { value: 2, name: 'OBRA-23'},
        { value: 3, name: 'OBRA-24'},
        { value: 4, name: 'OBRA-25'},
        { value: 5, name: 'OBRA-26'}        
      ]

    return (
        <Principal>
            {/* <div className='login01 tootip'>
                <img src={Logo} alt='Logo Empresa' className="imgtopo" />
            </div> */}

            <div className='login02'>
                <form onSubmit={handleSubmit}>
                    <h1>Acessar</h1>
                    <input type='text' placeholder="usuário" onChange={(e) => setUsuario(e.target.value)} ></input>
                    <input type='password' placeholder="senha" onChange={(e) => setSenha(e.target.value)}></input>

                    <select name="modulo" onChange={hendleObra} >
                        <option id={0} value={0} label=" - ESCOLHA O MODULO - " />
                        <option id={1} value={1} label="CADASTROS" />
                        <option id={2} value={2} label="FINANCEIRO" />
                        <option id={3} value={3} label="ESTOQUE/CUSTOS" />
                        <option id={4} value={4} label="MAO-DE-OBRA" />
                    </select>

                    <select name="obra" onChange={hendleModulo} >
                        {
                            obrasSelect.map( obraItem => (
                                <option id={obraItem.value} value={obraItem.value} label={obraItem.name} />
                            ) )
                        }
                    </select>
                    <button type='submit' >{loading?'Acessando...': 'Acessar'}</button>
                </form>
                {/* <span>Esqueceu a senha!?</span> */}
            </div>
        </Principal>
      );
}

export default Login