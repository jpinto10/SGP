import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal';
import Fornecedor from '../pages/Fornecedor';
import Cliente from '../pages/Cliente';
import Produto from '../pages/Produto';
import Empreendimento from '../pages/Empreendimento'


const Rotas = () => {
    // const { signed } = useContext(AuthContext);
    return(
        <Routes>
            <Route path='/' element= { <Home/> } />
            <Route path='/login' element={ <Signin/> }  />
            <Route path='/Fornecedor' element={ <Fornecedor/> }  />
            <Route path='/Empreendimento' element={ <Empreendimento/> }  />
            <Route path='/Produto' element={ <Produto/> }  />
            <Route path='/Clientes' element={ <Cliente/> }  />
            <Route path='*' element={<NotFound/>}  />    
        </Routes>
    )
}

export default Rotas;
