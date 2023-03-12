import React from "react";

import PrincipalGrig from "../PrincipalGrid";
import GridGridProduto from "../../components/GridProduto";

const Produto = () => {
 
    return (
        <PrincipalGrig grid={true} >
            <GridGridProduto />
        </PrincipalGrig>
      );
}

export default Produto