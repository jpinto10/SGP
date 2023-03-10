import React, {useEffect, useState} from "react";
import { Container } from './styles';
import { AiFillForward, AiFillBackward } from "react-icons/ai"
import { TiDocumentText, TiTrash, TiEye, TiPlus } from "react-icons/ti";

import ProdutoModal from "../Modais/Produto";

import Buttao from "../Buttao";

import conn from '../../services/sqlconnection'

//componente de impressão das informações - relacionado com o componente de tabela
const Row = ({linha, funcaoIncluir, funcaoEditar, funcaoExcluir, funcaoCosultar})=>{
    const keysItens = Object.keys(linha)
    return(
        <tr key={linha.codigo}>
            {   
                keysItens.map( key =>
                    ( (key !== 'btAlt' && key !== 'btExc' && key !== 'btnConsult') ?
                    <td colSpan={1} key={key}>{linha[key]}</td> : key === 'btAlt' ?
                    <Buttao click={()=>funcaoEditar(linha)} corFundo={'#f09809'} Children={<TiDocumentText color='#161616' size={25}/> } /> :
                    key === 'btExc' ? <Buttao click={()=>funcaoExcluir(linha)} corFundo={'#f00909'} Children={<TiTrash color='#161616' size={25}/> } /> : 
                    key === 'btnConsult' && <Buttao click={()=>funcaoCosultar(linha)} corFundo={'#0922f0'} Children={<TiEye color='#fff' size={25}/> } /> 
                ))                    
            }
           
        </tr>
    )
}


export default function GridProduto( {
    //Parâmetros
    btInc, 
    ...rest
    }){

    const [cabec, setCabec] = useState([
        { id: '1',  value: 'Código'},
        { id: '2',  value: 'Descrição'},
        { id: '3',  value: 'Unidade Medida '},
        { id: '4',  value: 'Responsável ' },
        { id: '5',  value: 'Fornecedor '},
        { id: '6',  value: 'Estoque Mínimo ' },
        { id: '7',  value: 'Custo Unitário' },
        { id: '8',  value: 'Qtd. Atual ' },
        { id: '9',  value: 'Qtd Disponível ' },
        { id: '10', value: 'Qtd Pendente ' },
        { id: '11', value: 'Ação'}
    ])

    const [adados, setAdados] = useState([]);
    const [dados, setDados] = useState([]);

    const [botInclusao, setBotInclusao] = useState(true);
    const [botAlteracao, setBotAlteracao] = useState(true);
    const [botExclusao, setBotExclusao] = useState(true);
    const [botConsulta, setBotConsulta] = useState(false);
    const [validaLinha, setValidaLinha] = useState(true);
    const [modo, setModo] = useState('');

    const [acaoModal, setAcaoModal] = useState('')
    
    const [showModal, setShowModal] = useState(false);

    const [itensGrid, setItensGrid] = useState([])
    const conect = conn()

    useEffect(()=>{
        setItensGrid([])
        loadingProduto()
    }, [adados])

    async function loadingProduto(){
        let todosProdutos = await conect.pegaTodosProdutos()
        if(todosProdutos.auth){
            for (let index = 0; index < todosProdutos.dadosProduto.length; index++) {
                itensGrid.push(
                    {
                        codigo:     todosProdutos.dadosProduto[index].codigo,  
                        endereco:   todosProdutos.dadosProduto[index].endereco, 
                        contato:    todosProdutos.dadosProduto[index].contato, 
                        cnpj:       todosProdutos.dadosProduto[index].cnpj, 
                        nome:       todosProdutos.dadosProduto[index].descricao, 
                        fone:       todosProdutos.dadosProduto[index].fone, 
                        email:      todosProdutos.dadosProduto[index].email, 
                        btAlt:      'ALT', 
                        btExc:      'EXC', 
                        // btnConsult: 'CSL'
                    })
                    
            }
            setAdados(itensGrid);
        }
    }
    

    const handleClose = ()=>{
        setShowModal(!showModal)
    }
    
    const modal = (dData, cEditouShow)=> {
        setShowModal(!showModal)
    }

    const inclus = ()=> {
        setAcaoModal('INCLUSÃO')
        setShowModal(!showModal)
    } 
    
    const edicao = (linha)=> {
        setAcaoModal('ALTERAÇÃO')
        setDados(linha)
        setShowModal(!showModal)
    } 


    const consultar = (linha)=> {
        setAcaoModal('CONSULTA')
        setDados(linha)
        setShowModal(!showModal)       
    } 
    
    const exclusao = (linha)=> {
        setAcaoModal('EXCLUSÃO')
        setDados(linha)
        setShowModal(!showModal)
    } 


    const paginacao = ()=> {
        // setShowModal(!showModal)
    }    
    
    return(
        <Container>
            <table>
                <thead>
                    {botInclusao && <Buttao corFundo={'#00FF00'} click={inclus}  Children={<TiPlus color='#504040' size={25}/> }  /> }

                    { (adados.length !== 0)  &&
                   
                        <tr>

                            {   
                                cabec.map((cabItem, index) =>  { 
                                    return(


                                            <th key={index}  >
                                            {
                                                cabItem.value
                                            }
                                            </th>
                                        )})
                            }

                        </tr>
                    }

                    { (adados.length === 0)  &&
                        <h1>Faça inclusão dos DADOS.</h1>
                    }

                </thead>

                { 
                        adados.map((linha, index) => { 
                            return( <tbody key={index}>
                                <Row funcaoIncluir={inclus} funcaoEditar={edicao} funcaoExcluir={exclusao} funcaoCosultar={consultar} linha={linha} />  
                            </tbody>
                            )  
                        })
                }

            </table>

            { (adados.length >= 3)  &&
                <div className="paginacao">
                    {paginacao && <Buttao corFundo={'#d4d4d4'} click={paginacao}  Children={<AiFillBackward color='#161616 ' size={25}/> }  /> }
                    {paginacao && <Buttao corFundo={'#d4d4d4'} click={paginacao}  Children={<AiFillForward  color='#161616 ' size={25}/> }  /> }
                </div>                     
            }

            { showModal && 
                <ProdutoModal acao={acaoModal} close={handleClose} dadosEditaveis={dados}  />
            }

        </Container>
    )
};

