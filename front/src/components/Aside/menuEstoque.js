import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const menuEstoque = [
    {
        title:'Doc. Entrada',
        path:"/DocEntrada",
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Doc. Saida',
        path:"/DocSaida",
        icon:<IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title:'Mov. Estoque',
        path:"/MovEstoque",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    }
]

export default menuEstoque;