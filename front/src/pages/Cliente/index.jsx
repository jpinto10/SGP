import React from "react";

import PrincipalGrig from "../PrincipalGrid";
import GridGridCliente from "../../components/GridCliente";

const Cliente = () => {
 
    return (
        <PrincipalGrig grid={true} >
            <GridGridCliente />
        </PrincipalGrig>
      );
}

export default Cliente