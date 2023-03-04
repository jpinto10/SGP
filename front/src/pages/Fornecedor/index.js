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
        { id: '2',  value: 'Endereço'},
        { id: '3',  value: 'Contato '},
        { id: '4',  value: 'C.N.P.J. ' },
        { id: '5',  value: 'Nome Fornecedor '},
        { id: '6',  value: 'Fone ' },
        { id: '7',  value: 'E-mail' },
        // { id: '8',  value: 'Dt. Ult. Compra '},
        // { id: '9',  value: 'Ultima Nota '},
        // { id: '10',  value: 'Total Comprado '},
        { id: '11',  value: 'Ação'}
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
        setItens([])
    }, [])


    useEffect(()=>{
        loadingFornecedor()
    }, [itens])

    async function loadingFornecedor(){
        let todosFornecedores = await conect.pegaTodosFornecedores()
        if(todosFornecedores.auth){
            for (let index = 0; index < todosFornecedores.dadosFornecedor.length; index++) {
                itens.push(
                    {
                        codigo:     todosFornecedores.dadosFornecedor[index].codigo,  
                        endereco:   todosFornecedores.dadosFornecedor[index].endereco, 
                        contato:    todosFornecedores.dadosFornecedor[index].contato, 
                        cnpj:       todosFornecedores.dadosFornecedor[index].cnpj, 
                        nome:       todosFornecedores.dadosFornecedor[index].descricao, 
                        fone:       todosFornecedores.dadosFornecedor[index].fone, 
                        email:      todosFornecedores.dadosFornecedor[index].email, 
                        // dtultm:     todosFornecedores.dadosFornecedor[index].dtUltimaCompra, 
                        // ultimnf:    todosFornecedores.dadosFornecedor[index].ultimaNota, 
                        // total:      'R$' + todosFornecedores.dadosFornecedor[index].totalComprado,       
                        btAlt:      'ALT', 
                        btExc:      'EXC', 
                        // btnConsult: 'CSL'
                    })
                    
            }

            // todosFornecedores.dadosFornecedor.forEach(element => {
            //     itens.push(
            //     {
            //         codigo:     element.codigo,  
            //         nome:       element.descricao, 
            //         fone:       element.fone, 
            //         email:      element.email, 
            //         dtultm:     element.dtUltimaCompra, 
            //         ultimnf:    element.ultimaNota, 
            //         total:      'R$' + element.totalComprado,       
            //         btAlt:      'ALT', 
            //         btExc:      'EXC', 
            //         // btnConsult: 'CSL'
            //     })
            // });
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