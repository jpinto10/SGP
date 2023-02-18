import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './style.css'

export default function Fornecedor(props){
    return(
        <div className='modal'>
            <div className='container'>
                    <strong>Cad Fornecedor</strong>
                <Tabs>
                    <TabList>
                        <Tab>Administrtivos</Tab>
                        <Tab>Financeiros</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>Administrativos interno</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Financeiros interno</h2>
                    </TabPanel>
                </Tabs>
                <div className='botaoGravar'>
                    <button>Gravar</button>
                    <button onClick={props.close} >Fechar</button>
                </div>
            </div>
        </div>
)
}