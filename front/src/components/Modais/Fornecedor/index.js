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
                        {/* <label>Ultma Compra</label>
                        <input name='ultimacompra' autoComplete='off'></input>
                        <label>Ultima Nota</label>
                        <input name='ultimanota' autoComplete='off'></input>
                        <label>Total Comprado</label>
                        <input name='totalcomprado' autoComplete='off'></input>
                        <label>Total pago</label>
                        <input name='totalpago' autoComplete='off'></input>
                        <label>Total a Pagar</label>
                        <input name='totalapagar' autoComplete='off'></input> */}
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