import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const menuCadastro = [
    {
        title:'Fornecedor',
        path:"/Home",
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Clientes',
        path:"/Products",
        icon:<IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title:'Produtos',
        path:"/Reports",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    },
    {
        title:'Obras',
        path:"/Reports",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    }


]

export default menuCadastro;