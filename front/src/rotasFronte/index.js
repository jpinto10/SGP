import React from 'react';
import { Routes } from 'react-router-dom';
import RouteWrapper from './Rotas'

// import User from '../pages/User';
import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal'

const Rotas = () => {
    debugger
    <Routes>
        <RouteWrapper exact path='/' component={ Home } isPrivate={false}/>
        <RouteWrapper exact path='/signin' component={ Signin } isPrivate={false} />
        <RouteWrapper exact path='*' component={NotFound} isPrivate={false} />    
    </Routes>
}

export default Rotas;