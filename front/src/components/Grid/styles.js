import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-content: stretch;
    color: black ;
    /* background-color: red ; */
    width: 100%;
    
    > table{
        border:1px solid #ccc;
        border-collapse: collapse ;
        width: 100% ;
        height: 100%;
        table-layout: fixed ;
    }    

    > table caption{
        font-size: 1.5em ;
        margin: .5em 0 .75em ;
    }

    >table th{
        padding: .60em ;
        text-align: left ;
        color: red ;
        background-color: #f8f8f8 ;

    }

    >table tr{
        background-color: #f8f8f8 ;
        border: 1px solid #ddd;
        padding: .35em ;
        padding: .62em ;
        text-align: justify ;

    }

    >table td button{
        /* margin-left: 4px ;
        width: 30px ;
        height: 30px ;
        border-radius: 5px ;
        padding-top: 4px ;

        border: 0;
        align-items: center;
        display: inline-block;
        transition: .4s;

        :hover{
            transform: scale(1.1);
        } */


    }
`;