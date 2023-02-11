import React, {useState} from "react";

import { Container } from './styles';
import { FiEdit2, FiEye } from 'react-icons/fi'
import { IoMdPulse } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

import Buttao from "../Buttao";


//componente de impressão das informações - relacionado com o componente de tabela
const Row = ({linha})=>{
    const keys = Object.keys(linha)
    return(
        <tr key={linha.id}>
            {
                keys.map(key => ( <td key={key}>{linha[key]}</td> ))
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
                    {botInclusao && <Buttao corFundo={'#00FF00'} click={inclus}  Children={<TiUserAdd color='#fff' size={25}/> }  /> }
                    <tr>
                        {
                            cabec.map(cabItem => <th key={cabItem}>{cabItem.value}</th> )
                        }
                    </tr>
                </thead>
                <tbody>
                    
                    { 
                        adados.map(linha => { return( <Row linha={linha} />  )  })
                    }

                </tbody>                           

            </table>

            {/* { showModal && 
                <ModalApontamento dadosApont = {dadosApontamento} close={handleClose} cEditouShow={modo} />
            } */}
            

        </Container>
    )
};

