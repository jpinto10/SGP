import { useContext } from 'react';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({ component: Componente, isPrivate, ...rest }){
    const { signed } = useContext(AuthContext);
    debugger
   
    if ((!signed) && isPrivate) {
        debugger
        return <Navigate to="/signin" />
    }        
  
    return (
        <Route {...rest} render={props => (<Componente {...props} />)} />
    );
}
