import {useContext, useEffect, useState} from "react";
import React from "react";
import { AuthContext } from "../../contexts/auth";
import conn from '../../services/sqlconnection'

import { toast  } from 'react-toastify';

import PrincipalGrig from "../PrincipalGrid";
import Grid from "../../components/Grid";

const Fornecedor = () => {
    const conect = conn()

    const [cabec, setCabec] = useState([
        { id: '1',  value: 'Código'},
        { id: '2',  value: 'Nome Fornecedor '},
        { id: '3',  value: 'Fone ' },
        { id: '4',  value: 'E-mail' },
        { id: '5',  value: 'Dt. Ult. Compra '},
        { id: '6',  value: 'Ultima Nota '},
        { id: '7',  value: 'Total Comprado '},
        { id: '8',  value: 'Ação'}
    ])

    const [adados, setAdados] = useState([])
  
    const [modulo, setModulo] = useState('')
    const [obra, setObra] = useState('')

    const [itens, setItens] = useState([])

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loading, user } = useContext(AuthContext);

    const [btInc, setInc]           = useState('INC')
    const [btAlt, setAlt]           = useState('ALT')
    const [btExc, setExc]           = useState('EXC')
    const [btnConsult, setConsult]  = useState('CSL')

    useEffect(()=>{
        loadingFornecedor()
        return ()=>{}
    }, [])

    async function loadingFornecedor(){
        let todosFornecedores = await conect.pegaTodosFornecedores()
        if(todosFornecedores.auth){
            todosFornecedores.dadosFornecedor.forEach(element => {
                itens.push(
                {
                    codigo:     element.codigo,  
                    nome:       element.descricao, 
                    fone:       element.fone, 
                    email:      element.email, 
                    dtultm:     element.dtUltimaCompra, 
                    ultimnf:    element.ultimaNota, 
                    total:      'R$' + element.totalComprado,       
                    btAlt:      'ALT', 
                    btExc:      'EXC', 
                    // btnConsult: 'CSL'
                })
            });
            setAdados(itens);
        }
    }

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
        <PrincipalGrig grid={true} >
            <Grid  cabec={cabec} adados={adados} btInc />
        </PrincipalGrig>
      );
}

export default Fornecedor