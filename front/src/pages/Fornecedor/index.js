import React from "react";

import PrincipalGrig from "../PrincipalGrid";
import GridGridFornecedor from "../../components/GridFornecedor";

const Fornecedor = () => {
 
    return (
        <PrincipalGrig grid={true} >
            <GridGridFornecedor />
        </PrincipalGrig>
      );
}

export default Fornecedor