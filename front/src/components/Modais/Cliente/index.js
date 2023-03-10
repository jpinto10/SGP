import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Input from '../../Input';

import './style.css'

import conn from '../../../services/sqlconnection'
import { useEffect, useState } from 'react';

import { toast  } from 'react-toastify';

export default function Cliente(props){
    const conect = conn()

    const [cnpj, setCnpj]           = useState('')
    const [codigo, setCodigo]       = useState('')
    const [descricao, setDescricao] = useState('')
    const [contato, setContato]     = useState('')
    const [email, setEmail]         = useState('')
    const [fone, setFone]           = useState('')
    const [endereco, setEndereco]   = useState('')

    useEffect(()=>{
        debugger
        loadDadosEditaveis()
    },[])

    function loadDadosEditaveis(){
        if(props.dadosEditaveis.codigo && props.acao !== 'INCLUSÃO'){
            setCodigo(props.dadosEditaveis.codigo)
            setCnpj(props.dadosEditaveis.cnpj)
            setDescricao(props.dadosEditaveis.nome)
            setContato(props.dadosEditaveis.contato)
            setEmail(props.dadosEditaveis.email)
            setFone(props.dadosEditaveis.fone)
            setEndereco(props.dadosEditaveis.endereco)
        }
    }

    const handleCodigo = (e)=>{
        setCodigo(e.target.value)
    }

    const handleDescricao = (e)=>{
        setDescricao(e.target.value)        
    }
    const handleCnpj = (e)=>{
        setCnpj(e.target.value)        
    }
    const handlecontato = (e)=>{
        setContato(e.target.value)                
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value)                
    }
    const handleFone =  (e)=>{
        setFone(e.target.value)                
    }
    const handleEndereco = (e)=>{
        setEndereco(e.target.value)        
    }

    async function hendleSavarCliente(e){
        e.preventDefault();
        const formData = new FormData();
        if(props.acao === 'EXCLUSÃO'){
            let exclueCliente = await conect.excCliente(cnpj)
            if (exclueCliente.auth){
                toast("Exclusão Realizada com Sucesso", {
                    autoClose:3000,
                    theme:"colored",
                    position:"top-center",
                    type:toast.TYPE.SUCCESS
                })            
            }

        }else{
            let gravaCliente = await conect.cadCliente(cnpj, codigo, descricao, contato, email, fone, endereco, formData)
            if (gravaCliente.auth){
                toast("ALTERAÇÃO REALIZADA", {
                    autoClose:3000,
                    theme:"colored",
                    position:"top-center",
                    type:toast.TYPE.SUCCESS
                })            
            }
        }
        props.close()
    }

    return(
        <form onSubmit={hendleSavarCliente}>
            <div className='modal'>
                <div className='container'>
                    <h1>CADASTRO DE CLIENTES - {props.acao}</h1>
                    <Tabs className='tabContainer'>
                        <TabList>
                            <Tab>Administrtivos</Tab>
                            <Tab>Financeiros</Tab>
                        </TabList>
                        <TabPanel className='tabAdm'>
                            <div className='campos'>
                                <Input maxLen={6} className={'coluna1'} value={codigo} name={'codigo'} funcao={handleCodigo} Apresenta={'Código'} />
                                <Input className={'coluna2'} value={descricao} name={'descricao'} funcao={handleDescricao} Apresenta={'Descrição'} />
                                <Input className={'coluna3'} value={cnpj} name={'cnpj'} funcao={handleCnpj} Apresenta={'cnpj'} />
                            </div>
                            <div className='campos'>
                                <Input className={'coluna1'} value={contato} name={'contato'} funcao={handlecontato} Apresenta={'Contado'} />
                                <Input className={'coluna2'} value={email} name={'email'} funcao={handleEmail} Apresenta={'E-mail'} />
                                <Input className={'coluna3'} value={fone} name={'fone'} funcao={handleFone} Apresenta={'Fone'} />
                            </div>
                            <div className='campos'>
                                <Input className={'coluna0'} value={endereco} name={'endereco'} funcao={handleEndereco} Apresenta={'Endereço'} />
                            </div>

                        </TabPanel>
                        <TabPanel className='tabFinanceiro' >
                            <div className='campos'>
                                <Input className={'coluna1'} name={'ultimacompra'} Apresenta={'Ultima Compra'} titulo='Ultima Compra Realizada' />
                                <Input className={'coluna1'} name={'ultimanota'}  Apresenta={'Ultima Nota'} titulo = 'Ultima Nofa de Entrada Recebida'/>
                                <Input className={'coluna1'} name={'totalcomprado'} Apresenta={'Total Comprado'} titulo='Total Comprado do Forncededor' />
                                <Input className={'coluna1'} name={'totalpago'} Apresenta={'Total Pago'} titulo='Total Pago ao Cliente'/>
                                <Input className={'coluna1'} name={'totalpagar'} Apresenta={'Total a Pagar'} titulo='Total a Pagar ao Cliente'/>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <div className='botao'>
                        <button className='gravar'>Gravar</button>
                        <button className='fechar' onClick={props.close} >Fechar</button>
                    </div>
                </div>
            </div>
        </form>
)}
