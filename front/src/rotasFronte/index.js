import React from 'react';
import { Routes } from 'react-router-dom';
import Routas from './Rotas'

// import User from '../pages/User';
import Signin from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Principal'

const Rotas = () => {
    debugger
    <Routes>
        <Routas exact path='/' component={ Home } isPrivate={false}/>
        <Routas exact path='/signin' component={ Signin } isPrivate={false} />
        <Routas exact path='*' component={NotFound} isPrivate={false} />    
    </Routes>
}

export default Rotas;