
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuCadastro } from './menuCadastro';
import { menuEstoque } from './menuEstoque';
import { menuFinanceiro } from './menuFinanceiro';
import { menuMaoDeObra } from './menuMaoDeObra';
import './style.css';

const Aside = () =>{
    return (
      <>
        <ul className='nav-menu-items' >
          {menuEstoque.map((item, index) => {
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