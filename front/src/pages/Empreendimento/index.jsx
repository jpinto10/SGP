import React from "react";

import PrincipalGrig from "../PrincipalGrid";
import GridGridEmpreendimento from "../../components/GridObra";

const Empreendimento = () => {
 
    return (
        <PrincipalGrig grid={true} >
            <GridGridEmpreendimento />
        </PrincipalGrig>
      );
}

export default Empreendimento