import React, {useState} from "react";

import { Container } from './styles';
import { FiEdit2, FiEye } from 'react-icons/fi'
import { IoMdPulse } from "react-icons/io";
import { AiFillForward, AiFillBackward } from "react-icons/ai"
import { TiUserAdd, TiDocumentText, TiTrash, TiEye, TiChevronRight, TiChevronLeft, TiPlus } from "react-icons/ti";

import Buttao from "../Buttao";

// import './style.css';


//componente de impressão das informações - relacionado com o componente de tabela
const Row = ({linha})=>{
    const keysItens = Object.keys(linha)
    return(
        <tr key={linha.codigo}>
            {   
                keysItens.map( key =>
                    ( (key !== 'btAlt' && key !== 'btExc' && key !== 'btnConsult') ?
                        <td colSpan={1} key={key}>{linha[key]}</td> : key === 'btAlt' ?
                        <Buttao corFundo={'#f09809'} Children={<TiDocumentText color='#161616' size={25}/> } /> :
                        key === 'btExc' ? <Buttao corFundo={'#f00909'} Children={<TiTrash color='#161616' size={25}/> } /> :
                        key === 'btnConsult' && <Buttao corFundo={'#0922f0'} Children={<TiEye color='#fff' size={25}/> } /> 
                    ))

            }
           
        </tr>
    )
}


export default function Grid( {
    //Parâmetros
    cabec, 
    adados, 
    btInc, 
    ...rest
    }){
    const [dados, setDados] = useState([]);
    const [botInclusao, setBotInclusao] = useState(btInc);
    const [botAlteracao, setBotAlteracao] = useState(true);
    const [botExclusao, setBotExclusao] = useState(true);
    const [botConsulta, setBotConsulta] = useState(true);
    const [validaLinha, setValidaLinha] = useState(true);
    const [modo, setModo] = useState('');

    const handleClose = ()=>{
        setShowModal(!showModal)
    }
    
    const modal = (dData, cEditouShow)=> {
        setShowModal(!showModal)
    }

    const inclus = ()=> {
        setShowModal(!showModal)
    }    

    const [showModal, setShowModal] = useState(false);
    return(
        <Container>
            <table>
                <thead>
                    {botInclusao && <Buttao corFundo={'#00FF00'} click={inclus}  Children={<TiPlus color='#504040' size={25}/> }  /> }
                    <tr>

                        {   
                            cabec.map((cabItem) =>  { 
                                return(
                                        <th key={cabItem} colSpan={(cabItem.id === '8')?1:1}  >
                                        {
                                            cabItem.value
                                        }
                                        </th>
                                    )})
                        }

                    </tr>
                </thead>
                <tbody>
                    
                    { 
                        adados.map(linha => { return( <Row linha={linha} />  )  })
                    }

                </tbody>                           
                    {botInclusao && <Buttao corFundo={'#e5e5e5'} click={inclus}  Children={<AiFillForward color='#161616 ' size={25}/> }  /> }
                    {botInclusao && <Buttao corFundo={'#e5e5e5'} click={inclus}  Children={<AiFillBackward color='#161616 ' size={25}/> }  /> }

            </table>
        </Container>
    )
};

