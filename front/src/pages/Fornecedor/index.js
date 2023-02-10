import {useContext, useEffect, useState} from "react";
import React from "react";
import { AuthContext } from "../../contexts/auth";

import { ToastContainer, toast  } from 'react-toastify';

import Logo from '../../assets/CMS.png';
// import './index.css';

import Principal from "../Principal";
import Grid from "../../components/Grid";

const Fornecedor = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loading, user } = useContext(AuthContext);

    const [btInc, setInc]           = useState(true)
    const [btAlt, setAlt]           = useState(true)
    const [btExc, setExc]           = useState(true)
    const [btnConsult, setConsult]  = useState(true)


    const [adados, setAdados] = useState([
        {id: '1' , value: 'AAAAAA', btAlt,  btExc,  btnConsult},
        {id: '2' , value: 'BBBBBB', btAlt,  btExc,  btnConsult},
        {id: '3' , value: 'CCCCCC', btAlt,  btExc,  btnConsult},
        {id: '4' , value: 'DDDDDD', btAlt,  btExc,  btnConsult},
        {id: '5' , value: 'EEEEEE', btAlt,  btExc,  btnConsult},
        {id: '6' , value: 'FFFFFF', btAlt,  btExc,  btnConsult},
        {id: '7' , value: 'GGGGGG', btAlt,  btExc,  btnConsult},
        {id: '8' , value: 'HHHHHH', btAlt,  btExc,  btnConsult}      
    ])
  
    const [cabec, setCabec] = useState([
        { id: '1',  value: 'Código'},
        { id: '2',  value: 'Nome Fornecedor'},
        { id: '3',  value: 'Fone' },
        { id: '4',  value: 'E-mail' },
        { id: '5',  value: 'Dt. Ult. Compra'},
        { id: '6',  value: 'Ultima Nota'},
        { id: '7',  value: 'Total Comprado'},
        { id: '8',  value: 'Ação'}
    ])

    const [modulo, setModulo] = useState('')
    const [obra, setObra] = useState('')

    //função para pegar a opção de escolha de obra.. no select
    function hendleObra(e){
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


   
    return (
        <Principal grid={true} >
            <Grid  cabec={cabec} adados={adados} btInc />
        </Principal>
      );
}

export default Fornecedor