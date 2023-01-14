import React from 'react';
import Topo from '../Topo';

const estruturaLogin = (props) => {
    return (
        <section>
          <Topo />
          {props.children}
        </section>
      );
}

export default estruturaLogin