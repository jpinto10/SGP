import styled from "styled-components";

export const Container = styled.div`
    color: black ;
    /* display: flex;
    align-content: stretch; */
    /* background-color: red ; */
    
    > table{
        margin-top: 0.03rem;
        background-color: #f8f8f8 ;
        border:1px solid #ccc;
        border-collapse: collapse ;
        width: 100% ;
        table-layout: fixed ;
    }    

    >table th{
        padding: .50em  0 .50em 0;
        text-align: left ;
        color: red ;
        background-color: #f8f8f8 ;

    }

    >table tr{
        background-color: #f8f8f8 ;
        border: 1px solid #ddd;
        padding: .35em ;
        text-align: justify ;

    }

    >table button{
        margin-top: 0.05rem;
        margin-bottom: 0.05rem;
        margin-left: 4px ;
        width: 30px ;
        height: 30px ;
        border-radius: 5px ;
        padding-top: 2px ;

        border: 0;
        transition: .1s;

        :hover{
            transform: scale(1.1);
        }


    }

    .paginacao{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        transition: .1s;
    }

    .paginacao button{
        margin-top: 0.5rem;
        margin-left: 4px ;
        width: 30px ;
        height: 30px ;
        border-radius: 5px ;
        padding-top: 2px ;
        border: 1px solid;

        :hover{
                transform: scale(1.1);
            }
    }




`;