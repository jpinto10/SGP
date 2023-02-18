import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Input from '../../Input';

import './style.css'

export default function Fornecedor(props){
    return(
        <div className='modal'>
            <div className='container'>
                    <h1>CADASTRO DE FORNECEDORES</h1>
                <Tabs className='tabContainer'>
                    <TabList>
                        <Tab>Administrtivos</Tab>
                        <Tab>Financeiros</Tab>
                    </TabList>
                    <TabPanel className='tabAdm'>
                        <div className='campos'>
                            <Input className={'coluna1'} name={'codigo'} Apresenta={'Código'} />
                            <Input className={'coluna2'} name={'descricao'} Apresenta={'Descrição'} />
                        </div>
                        <div className='campos'>
                            <Input className={'coluna1'} name={'contato'} Apresenta={'Contado'} />
                            <Input className={'coluna2'} name={'email'} Apresenta={'E-mail'} />
                        </div>
                        <div className='campos'>
                            <Input className={'coluna1'} name={'fone'} Apresenta={'Fone'} />
                            <Input className={'coluna2'} name={'endereco'} Apresenta={'Endereço'} />
                        </div>

                    </TabPanel>
                    <TabPanel className='tabFinanceiro' >
                        <div className='campos'>
                            <Input className={'coluna1'} name={'ultimacompra'} Apresenta={'Ultima Compra'} titulo='Ultima Compra Realizada' />
                            <Input className={'coluna1'} name={'ultimanota'} Apresenta={'Ultima Nota'} titulo = 'Ultima Nofa de Entrada Recebida'/>
                            <Input className={'coluna1'} name={'totalcomprado'} Apresenta={'Total Comprado'} titulo='Total Comprado do Forncededor' />
                            <Input className={'coluna1'} name={'toalpago'} Apresenta={'Total Pago'} titulo='Total Pago ao Fornecedor'/>
                            <Input className={'coluna1'} name={'totalpagar'} Apresenta={'Total a Pagar'} titulo='Total a Pagar ao Fornecedor'/>
                        </div>
                    </TabPanel>
                </Tabs>
                <div className='botao'>
                    <button className='gravar'>Gravar</button>
                    <button className='fechar' onClick={props.close} >Fechar</button>
                </div>
            </div>
        </div>
)
}