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
    const { signIn, loading, user } = useContext(AuthContext);

    const [modulo, setModulo] = useState('')
    const [obra, setObra] = useState('')

    //função para pegar a opção de escolha de obra.. no select
    function hendleObra(e){
        debugger
        e.preventDefault();
        setObra(e.target.value)
    }
    
    //função para pegar a opção de módulo.. no select
    function hendleModulo(e){
        debugger
        e.preventDefault();
        setModulo(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault();
        debugger        
        if(usuario.length===0){
            toast("Usuário não Digitado.... Não seguiremos", {
                autoClose:3000,
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
            toast("Módulo não escolhido.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        if(obra.length===0){
            toast("Obra não selecionada.... Não seguiremos", {
                theme:"colored",
                position:"top-center",
                type:toast.TYPE.ERROR
            })
        }

        await signIn(usuario, senha, modulo, obra);
    };

    useEffect(()=>{
        // setObras(obrasSelect)
    },[])
    
    const obrasSelect = [
        { value: '', name: '- ESCOLHA A OBRA -' },
        { value: 1, name: 'OBRA-01'},
        { value: 2, name: 'OBRA-02'},
        { value: 3, name: 'OBRA-03'},
        { value: 4, name: 'OBRA-04'},
        { value: 5, name: 'OBRA-05'},
        { value: 6, name: 'OBRA-06'},
        { value: 7, name: 'OBRA-07'},
        { value: 8, name: 'OBRA-08'},
        { value: 9, name: 'OBRA-09'},
        { value: 10, name: 'OBRA-10'},
        { value: 11, name: 'OBRA-11'},
        { value: 12, name: 'OBRA-12'},
        { value: 13, name: 'OBRA-13'},
        { value: 14, name: 'OBRA-14'},
        { value: 15, name: 'OBRA-15'},
        { value: 16, name: 'OBRA-16'},
        { value: 17, name: 'OBRA-17'},
        { value: 18, name: 'OBRA-18'},
        { value: 19, name: 'OBRA-19'},
        { value: 20, name: 'OBRA-20'},
        { value: 21, name: 'OBRA-21'},
        { value: 22, name: 'OBRA-22'},
        { value: 23, name: 'OBRA-23'},
        { value: 24, name: 'OBRA-24'},
        { value: 25, name: 'OBRA-25'},
        { value: 26, name: 'OBRA-26'}        
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

                    <select name="modulo" onChange={hendleModulo} >
                        <option id={0} value={''} label=" - ESCOLHA O MODULO - " />
                        <option id={1} value={'menuCadastro'} label="CADASTROS" />
                        <option id={2} value={'menuFinanceiro'} label="FINANCEIRO" />
                        <option id={3} value={'menuEstoque'} label="ESTOQUE/CUSTOS" />
                        <option id={4} value={'menuMaoDeObra'} label="MAO-DE-OBRA" />
                    </select>

                    <select name="obra" onChange={hendleObra} >
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