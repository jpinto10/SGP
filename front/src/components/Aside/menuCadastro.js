import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const menuCadastro = [
    {
        title:'Fornecedor',
        path:"/Fornecedor",
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Clientes',
        path:"/Clientes",
        icon:<IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title:'Produtos',
        path:"/Produtos",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    },
    {
        title:'Obras',
        path:"/Obras",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    }


]

export default menuCadastro;