import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Input from '../../Input';

import './style.css'

import conn from '../../../services/sqlconnection'
import { useEffect, useState } from 'react';

import { toast  } from 'react-toastify';

export default function Produto(props){
    const conect = conn()

    const [unidademedida, setUnidadeMedida] = useState('')
    const [codigo, setCodigo]       = useState('')
    const [descricao, setDescricao] = useState('')
    const [contato, setContato]     = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [fone, setFone]           = useState('')
    const [almoxarifado, setAlmoxarifado]   = useState('')

    useEffect(()=>{
        debugger
        loadDadosEditaveis()
    },[])

    function loadDadosEditaveis(){
        if(props.dadosEditaveis.codigo && props.acao !== 'INCLUSÃO'){
            setCodigo(props.dadosEditaveis.codigo)
            setUnidadeMedida(props.dadosEditaveis.unidademedida)
            setDescricao(props.dadosEditaveis.nome)
            setContato(props.dadosEditaveis.contato)
            setResponsavel(props.dadosEditaveis.responsavel)
            setFone(props.dadosEditaveis.fone)
            setAlmoxarifado(props.dadosEditaveis.almoxarifado)
        }
    }

    const handleCodigo = (e)=>{
        setCodigo(e.target.value)
    }

    const handleDescricao = (e)=>{
        setDescricao(e.target.value)        
    }

    const handleUM = (e)=>{
        setUnidadeMedida(e.target.value)        
    }

    const handlecontato = (e)=>{
        setContato(e.target.value)                
    }

    const handleResponsavel = (e)=>{
        setResponsavel(e.target.value)                
    }

    const handleFone =  (e)=>{
        setFone(e.target.value)                
    }
    
    const handleAlmoxarifado = (e)=>{
        setAlmoxarifado(e.target.value)        
    }

    async function hendleSavarProduto(e){
        e.preventDefault();
        const formData = new FormData();
        if(props.acao === 'EXCLUSÃO'){
            let exclueProduto = await conect.excProduto(unidademedida)
            if (exclueProduto.auth){
                toast("Exclusão Realizada com Sucesso", {
                    autoClose:3000,
                    theme:"colored",
                    position:"top-center",
                    type:toast.TYPE.SUCCESS
                })            
            }

        }else{
            let gravaProduto = await conect.cadProduto(unidademedida, codigo, descricao, contato, responsavel, fone, almoxarifado, formData)
            if (gravaProduto.auth){
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
        <form onSubmit={hendleSavarProduto}>
            <div className='modal'>
                <div className='container'>
                    <h1>CADASTRO DE PRODUTOS - {props.acao}</h1>
                    <Tabs className='tabContainer'>
                        <TabList>
                            <Tab>Administrtivos</Tab>
                            <Tab>Financeiros</Tab>
                        </TabList>
                        <TabPanel className='tabAdm'>
                            <div className='campos'>
                                <Input maxLen={6} className={'coluna1'} value={codigo} name={'codigo'} funcao={handleCodigo} Apresenta={'Código'} />
                                <Input className={'coluna2'} value={descricao} name={'descricao'} funcao={handleDescricao} Apresenta={'Descrição'} />
                                <Input maxLen={2} className={'coluna1'} value={unidademedida} name={'unidademedida'} funcao={handleUM} Apresenta={'U.M.'} />
                                <Input maxLen={2} className={'coluna1'} value={almoxarifado} name={'almoxarifado'} funcao={handleAlmoxarifado} Apresenta={'Almx.'} />
                            </div>
                            <div className='campos'>
                                <Input className={'coluna1'} value={contato} name={'contato'} funcao={handlecontato} Apresenta={'Contado'} />
                                <Input className={'coluna1'} value={fone} name={'fone'} funcao={handleFone} Apresenta={'Fone'} />
                                <Input className={'coluna2'} value={responsavel} name={'responsavel'} funcao={handleResponsavel} Apresenta={'Responsável'} />
                            </div>

                        </TabPanel>
                        <TabPanel className='tabFinanceiro' >
                            <div className='campos'>
                                <Input className={'coluna1'} name={'ultimacompra'} Apresenta={'Ultima Compra'} titulo='Ultima Compra Realizada' />
                                <Input className={'coluna1'} name={'ultimanota'}  Apresenta={'Ultima Nota'} titulo = 'Ultima Nofa de Entrada Recebida'/>
                                <Input className={'coluna1'} name={'totalcomprado'} Apresenta={'Total Comprado'} titulo='Total Comprado do Forncededor' />
                                <Input className={'coluna1'} name={'totalpago'} Apresenta={'Total Pago'} titulo='Total Pago ao Produto'/>
                                <Input className={'coluna1'} name={'totalpagar'} Apresenta={'Total a Pagar'} titulo='Total a Pagar ao Produto'/>
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
