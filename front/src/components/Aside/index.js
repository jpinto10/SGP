
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './style.css';

import { menuCadastro } from './menuCadastro';
import { menuEstoque } from './menuEstoque';
import { menuFinanceiro } from './menuFinanceiro';
import { menuMaoDeObra } from './menuMaoDeObra';


const Aside = () =>{
    const { moduloLogado, signed } = useContext(AuthContext);
    // debugger

    return (
      <>
        <ul className='nav-menu-items' >
          
            { signed && moduloLogado === 'menuCadastro' && menuCadastro.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}


            { signed && moduloLogado === 'menuEstoque' && menuEstoque.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

            { signed && moduloLogado === 'menuFinanceiro' && menuFinanceiro.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}


            { signed && moduloLogado === 'menuMaoDeObra' && menuMaoDeObra.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}



        </ul>
      </>
    );
  }
export default Aside;