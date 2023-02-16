import React, { useState } from 'react';

function Table({ data }) {
  const [tableData, setTableData] = useState(data);

  function handleInputChange(event, itemId, field) {
    const newData = tableData.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          [field]: event.target.value,
        };
      }
      return item;
    });
    setTableData(newData);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                type="text"
                value={item.nome}
                onChange={(event) => handleInputChange(event, item.id, 'nome')}
              />
            </td>
            <td>
              <input
                type="text"
                value={item.email}
                onChange={(event) => handleInputChange(event, item.id, 'email')}
              />
            </td>
            <td>
              <button onClick={() => handleButtonClick(item.id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function handleButtonClick(itemId) {
  console.log(`Botão para editar item ${itemId} foi clicado`);
}

export default Table;
