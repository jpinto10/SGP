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

    const [btInc, setInc]           = useState('INC')
    const [btAlt, setAlt]           = useState('ALT')
    const [btExc, setExc]           = useState('EXC')
    const [btnConsult, setConsult]  = useState('CSL')


    const [adados, setAdados] = useState([
        {codigo: 'AAAAAA', nome:'edilson', fone: '121212', email:'121212', dtultm: '20/11/75', ultimnf: '00005', total: 'R$ 1000.00',       btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'BBBBBB', nome:'gustavo', fone: '121212', email:'121212', dtultm: '01/01/89', ultimnf: '123587', total: 'R$ 1000.00',      btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'CCCCCC', nome:'leleide', fone: '121212', email:'121212', dtultm: '01/23/58', ultimnf: '85748', total: 'R$ 1000.00',       btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'DDDDDD', nome:'aurora ', fone: '121212', email:'1212121', dtultm: '01/01/01', ultimnf: '00001545', total: 'R$ 1000.00',   btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'EEEEEE', nome:'1111111', fone: '121212', email:'121212', dtultm: '01/01/05', ultimnf: '002113213', total: 'R$ 1000.00',   btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'FFFFFF', nome:'2222222', fone: '121212', email:'1212212', dtultm: '02/05/08', ultimnf: '213897', total: 'R$ 1000.00',     btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'GGGGGG', nome:'3333333', fone: '121212', email:'113313', dtultm: '02/05/2023', ultimnf: '23134589', total: 'R$ 0.00',     btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'AAAAAA', nome:'edilson', fone: '121212', email:'121212', dtultm: '20/11/75', ultimnf: '00005', total: 'R$ 1000.00',       btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'BBBBBB', nome:'gustavo', fone: '121212', email:'121212', dtultm: '01/01/89', ultimnf: '123587', total: 'R$ 1000.00',      btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'CCCCCC', nome:'leleide', fone: '121212', email:'121212', dtultm: '01/23/58', ultimnf: '85748', total: 'R$ 1000.00',       btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'DDDDDD', nome:'aurora ', fone: '121212', email:'1212121', dtultm: '01/01/01', ultimnf: '00001545', total: 'R$ 1000.00',   btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'EEEEEE', nome:'1111111', fone: '121212', email:'121212', dtultm: '01/01/05', ultimnf: '002113213', total: 'R$ 1000.00',   btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'FFFFFF', nome:'2222222', fone: '121212', email:'1212212', dtultm: '02/05/08', ultimnf: '213897', total: 'R$ 1000.00',     btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},
        {codigo: 'GGGGGG', nome:'3333333', fone: '121212', email:'113313', dtultm: '05/02/2025', ultimnf: '23134589', total: 'R$ 0.00',     btInc:'INC', btAlt:'ALT', btExc:'EXC', btnConsult:'CSL'},

    ])
  
    const [cabec, setCabec] = useState([
        { id: '1',  value: 'Código -'},
        { id: '2',  value: 'Nome Fornecedor -'},
        { id: '3',  value: 'Fone -' },
        { id: '4',  value: 'E-mail -' },
        { id: '5',  value: 'Dt. Ult. Compra -'},
        { id: '6',  value: 'Ultima Nota -'},
        { id: '7',  value: 'Total Comprado -'},
        { id: '8',  value: 'Ação'},
        { id: '8',  value: ''},
        { id: '8',  value: ''},
        { id: '8',  value: ''}
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