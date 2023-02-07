import React, {useState} from "react";

import { Container } from './styles';
import { FiEdit2, FiEye } from 'react-icons/fi'
import { IoMdPulse } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

import Buttao from "../Buttao";

const Grid = ({data, btInc, btAlt,  btExc,  btnConsult })=>{
    const [dados, setDados] = useState([]);
    const [botInclusao, setBotInclusao] = useState(btInc);
    const [botAlteracao, setBotAlteracao] = useState(btAlt);
    const [botExclusao, setBotExclusao] = useState(btExc);
    const [botConsulta, setBotConsulta] = useState(btnConsult);
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
    const cabec = Object.keys(data[0])
    return(
        <Container>
            <table>
                <thead>
                    {botInclusao && <Buttao corFundo={'#00FF00'} click={inclus}  Children={<TiUserAdd color='#fff' size={25}/> }  /> }
                    <tr>
                        {
                            cabec.map(cabItem => <th key={cabItem}>{cabItem.toLocaleUpperCase()}</th> )
                        }
                    </tr>
                </thead>
                <tbody>
                    { data.map(linha => <Row record={linha} modal={modal} />)  }   
                </tbody>                           

            </table>

            {/* { showModal && 
                <ModalApontamento dadosApont = {dadosApontamento} close={handleClose} cEditouShow={modo} />
            } */}
            

        </Container>
    )
};

const Row = ({record, modal, bt01, bt02, bt03}) =>{
    
    const keys = Object.keys(record)
    const dData = record
    return(
        <tr key={record.matricula}>
            {
                keys.map( key => 
                    key === 'Acao' ? (
                        <td key={key} > 
                            { bt01 && <Buttao corFundo={'#f30707'} click={()=>modal(record, 'edit')} Children={<FiEdit2 color='#fff' size={15}/> }  /> }                          
                            { bt02 && <Buttao corFundo={'#629bf0'} click={()=>modal(record, 'show')} Children={<FiEye color='#1b3675' size={15}/> } />  }                                    
                            { bt03 && <Buttao corFundo={'#f0a351'} click={()=>modal(record, 'show')} Children={<IoMdPulse color='#1b3675' size={15}/> } />  }                                    
                        </td>) : (<td key={key} > {record[key]} </td> )
                )
            }
            
        </tr>

        
    )

}

export default Grid