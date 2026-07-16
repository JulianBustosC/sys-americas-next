import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ data, encabezados }) => {
  return (
  
    <table className='table table-striped'>
      <thead>
        <tr>
          {encabezados.map((encabezado, idx) => (
            <th key={idx}>{encabezado}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((fila, i) => (
          <tr key={i}>
            {encabezados.map((col, j) => (
              <td key={j}>{fila[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
       
    </table>
    
  );
}

export default Table;
