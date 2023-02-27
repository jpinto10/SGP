import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

// import RouteWrapper from './Rotas'

import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal'
import Fornecedor from '../pages/Fornecedor'

const Rotas = () => {
    // const { signed } = useContext(AuthContext);
    return(
        <Routes>
            <Route path='/' element= { <Home/> } />
            <Route path='/login' element={ <Signin/> }  />
            <Route path='/Fornecedor' element={ <Fornecedor/> }  />
            <Route path='*' element={<NotFound/>}  />    
        </Routes>
    )
}

export default Rotas;
