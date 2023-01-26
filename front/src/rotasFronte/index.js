import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import RouteWrapper from './Rotas'

import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal'

const Rotas = () => {
    debugger
    return(
        <Routes>
            <Route path='/signin' element={ <Home/> } />
            <Route path='/' element={ <Signin/> }  />
            <Route path='*' component={<NotFound/>}  />    
        </Routes>
    )
}

export default Rotas;
