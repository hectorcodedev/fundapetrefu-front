import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const PetsTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  return (
    <div>
      <div className="row d-flex justify-content-center mt-5">
        <div
          className="table-responsive"
          style={{ width: 95 + "%", fontSize: 80 + "%" }}
        >
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Edad</th>
                <th className="text-center">Género</th>
                <th className="text-center">Especie</th>
                <th className="text-center">Tamaño</th>
                <th className="text-center">Condicion Especial</th>
                <th className="text-center">Adoptado?</th>
                <th className="text-center">Destacado?</th>
                <th className="text-center">Imagen Destacada</th>
                <th className="text-center">Descripción</th>
                <th className="text-center">Documento Adoptante</th>
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
                  <td>{item.petName}</td>
                  <td>{item.petAge}</td>
                  <td>{item.petGender}</td>
                  <td>{item.petSpecies}</td>
                  <td>{item.petSize}</td>
                  <td>{item.petSpecialCondition}</td>
                  <td>{item.isAdopted ? "si" : "no"}</td>
                  <td>{item.isFeatured ? "si" : "no"}</td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      minWidth: 150 + "px",
                      maxWidth: 150 + "px",
                    }}
                  >
                    {item.featuredImg}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.adopterDniNumber}</td>
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
    </div>
  );
};

export default PetsTable;
