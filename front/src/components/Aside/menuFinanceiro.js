import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const menuFinanceiro = [
    {
        title:'Ctas.Pagar',
        path:"/Home",
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Ctas.Receber',
        path:"/Products",
        icon:<IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
]

export default menuFinanceiro;