import React, {useState} from "react";

import { Container } from './styles';
import { FiEdit2, FiEye } from 'react-icons/fi'
import { IoMdPulse } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

import Buttao from "../Buttao";

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
    debugger

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
                    { adados.map(linha => <Row record={linha} />)  }   
                </tbody>                           

            </table>

            {/* { showModal && 
                <ModalApontamento dadosApont = {dadosApontamento} close={handleClose} cEditouShow={modo} />
            } */}
            

        </Container>
    )
};

const Row = ({record}) =>{
    
    const keys = Object.keys(record)
    return(
        <tr key={record.id}>
            {
                keys.map( key => 
                    // key === 'Acao' ? (
                    //     <td key={key} > 
                    //         { bt01 && <Buttao corFundo={'#f30707'} click={()=>modal(record, 'edit')} Children={<FiEdit2 color='#fff' size={15}/> }  /> }                          
                    //         { bt02 && <Buttao corFundo={'#629bf0'} click={()=>modal(record, 'show')} Children={<FiEye color='#1b3675' size={15}/> } />  }                                    
                    //         { bt03 && <Buttao corFundo={'#f0a351'} click={()=>modal(record, 'show')} Children={<IoMdPulse color='#1b3675' size={15}/> } />  }                                    
                    //     </td>) : 
                        (<td key={key} > {record.value} </td> )
                )
            }
            
        </tr>

        
    )

}