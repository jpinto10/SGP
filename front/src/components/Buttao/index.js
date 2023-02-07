import React from "react";

export default function Buttao ({
    //parâmetros
    corFundo, 
    Children,
    click
}){

    return(
        <button style={{backgroundColor: corFundo }} onClick={click}   >
            {Children}
        </button>    
    )

}