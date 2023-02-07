import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const menuMaoDeObra = [
    {
        title:'Horas Trabalhadas',
        path:"/HorasTrabalhadas",
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Equipes',
        path:"/Equipes",
        icon:<IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
]

export default menuMaoDeObra;