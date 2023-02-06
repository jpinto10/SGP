import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import RouteWrapper from './Rotas'

import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal'

const Rotas = () => {
    return(
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/login' element={ <Signin/> }  />
            <Route path='*' element={<NotFound/>}  />    
        </Routes>
    )
}

export default Rotas;
