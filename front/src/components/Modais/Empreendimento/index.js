import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Input from '../../Input';

import './style.css'

import conn from '../../../services/sqlconnection'
import { useEffect, useState } from 'react';

import { toast  } from 'react-toastify';

export default function Empreendimento(props){
    const conect = conn()

    const [responsavel, setResponsavel]           = useState('')
    const [codigo, setCodigo]       = useState('')
    const [descricao, setDescricao] = useState('')
    const [dtinicio, setDtinicio]   = useState('')
    const [dtprevisao, setdtPrevisao]  = useState('')
    const [fone, setFone]           = useState('')
    const [endereco, setEndereco]   = useState('')

    useEffect(()=>{
        debugger
        loadDadosEditaveis()
    },[])

    function loadDadosEditaveis(){
        if(props.dadosEditaveis.codigo && props.acao !== 'INCLUSÃO'){
            setCodigo(props.dadosEditaveis.codigo)
            setResponsavel(props.dadosEditaveis.responsavel)
            setDescricao(props.dadosEditaveis.descricao)
            setDtinicio(props.dadosEditaveis.dtinicio)
            setdtPrevisao(props.dadosEditaveis.dtprevisao)
        }
    }

    const handleCodigo = (e)=>{
        setCodigo(e.target.value)
    }

    const handleDescricao = (e)=>{
        setDescricao(e.target.value)        
    }
    const handleresponsavel = (e)=>{
        setResponsavel(e.target.value)        
    }
    const handledtinicio = (e)=>{
        setDtinicio(e.target.value)                
    }
    const handledtprevisao = (e)=>{
        setdtPrevisao(e.target.value)                
    }
    const handleFone =  (e)=>{
        setFone(e.target.value)                
    }
    const handleEndereco = (e)=>{
        setEndereco(e.target.value)        
    }

    async function hendleSavarEmpreendimento(e){
        e.preventDefault();
        const formData = new FormData();
        if(props.acao === 'EXCLUSÃO'){
            let exclueEmpreendimento = await conect.excEmpreendimento(responsavel)
            if (exclueEmpreendimento.auth){
                toast("Exclusão Realizada com Sucesso", {
                    autoClose:3000,
                    theme:"colored",
                    position:"top-center",
                    type:toast.TYPE.SUCCESS
                })            
            }

        }else{
            let gravaEmpreendimento = await conect.cadEmpreendimento(responsavel, codigo, descricao, dtinicio, dtprevisao, formData)
            if (gravaEmpreendimento.auth){
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
        <form onSubmit={hendleSavarEmpreendimento}>
            <div className='modal'>
                <div className='container'>
                    <h1>CADASTRO DE EMPREENDIMENTOS - {props.acao}</h1>
                    <Tabs className='tabContainer'>
                        <TabList>
                            <Tab>Administrtivos</Tab>
                            <Tab>Financeiros</Tab>
                        </TabList>
                        <TabPanel className='tabAdm'>
                            <div className='campos'>
                                <Input maxLen={6} className={'coluna1'} value={codigo} name={'codigo'} funcao={handleCodigo} Apresenta={'Código'} />
                                <Input className={'coluna3'} value={descricao} name={'descricao'} funcao={handleDescricao} Apresenta={'Descrição'} />
                            </div>
                            <div className='campos'>
                                <Input className={'coluna1'} value={dtinicio} name={'dtinicio'} funcao={handledtinicio} Apresenta={'Data Inicio'} />
                                <Input className={'coluna1'} value={dtprevisao} name={'dtprevisao'} funcao={handledtprevisao} Apresenta={'Dt. Previsão'} />
                                <Input className={'coluna3'} value={responsavel} name={'responsavel'} funcao={handleresponsavel} Apresenta={'Responsável'} />
                            </div>

                        </TabPanel>
                        <TabPanel className='tabFinanceiro' >
                            <div className='campos'>
                                <Input className={'coluna1'} name={'ultimacompra'} Apresenta={'Ultima Compra'} titulo='Ultima Compra Realizada' />
                                <Input className={'coluna1'} name={'ultimanota'}  Apresenta={'Ultima Nota'} titulo = 'Ultima Nofa de Entrada Recebida'/>
                                <Input className={'coluna1'} name={'totalcomprado'} Apresenta={'Total Comprado'} titulo='Total Comprado do Forncededor' />
                                <Input className={'coluna1'} name={'totalpago'} Apresenta={'Total Pago'} titulo='Total Pago ao Empreendimento'/>
                                <Input className={'coluna1'} name={'totalpagar'} Apresenta={'Total a Pagar'} titulo='Total a Pagar ao Empreendimento'/>
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
