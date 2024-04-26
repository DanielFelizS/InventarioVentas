export default function TableHead ({ HeadPath }) {
    return (
      <thead>
        <tr>
          {HeadPath.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
            <th>Acciones</th>
        </tr>
      </thead>
    );
  };