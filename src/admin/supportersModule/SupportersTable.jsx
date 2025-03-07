import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const SupportersTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  return (
    <div className="row d-flex justify-content-center mt-5">
      <div
        className="table-responsive"
        style={{ width: 95 + "%", fontSize: 80 + "%" }}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center">Id</th>
              <th className="text-center">Nombres</th>
              <th className="text-center">Apellidos Noticia</th>
              <th className="text-center">Tipo Documento</th>
              <th className="text-center">Numero Documento</th>
              <th className="text-center">Teléfono</th>
              <th className="text-center">Correo</th>
              <th className="text-center">Ayuda</th>
              <th className="text-center">Editar</th>
              <th className="text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    wordWrap: "break-word",
                    minWidth: 150 + "px",
                    maxWidth: 150 + "px",
                  }}
                >
                  {item.id}
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.dniType}</td>
                <td>{item.dniNumber}</td>
                <td>{item.cellphone}</td>
                <td>{item.email}</td>
                <td>{item.supportAlternatives}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(true);
                      handleEdit(item.id);
                    }}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportersTable;
