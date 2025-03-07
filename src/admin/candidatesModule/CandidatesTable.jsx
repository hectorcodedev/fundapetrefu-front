import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const CandidatesTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
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
                <th className="text-center">Nombres</th>
                <th className="text-center">Apellidos</th>
                <th className="text-center">Tipo</th>
                <th className="text-center">Número</th>
                <th className="text-center">Edad</th>
                <th className="text-center">Dirección</th>
                <th className="text-center">Barrio</th>
                <th className="text-center">Localidad</th>
                <th className="text-center">Estrato</th>
                <th className="text-center">Estado Civil</th>
                <th className="text-center">Hijos</th>
                <th className="text-center">Celular</th>
                <th className="text-center">Ocupación</th>
                <th className="text-center">Nombre Empresa</th>
                <th className="text-center">Dirección Empresa</th>
                <th className="text-center">Telefono Empresa</th>
                <th className="text-center">Correo</th>
                <th className="text-center">Usuario Facebook</th>
                <th className="text-center">Usuario Instagram</th>
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
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>{item.neighborhood}</td>
                  <td>{item.locality}</td>
                  <td>{item.stratum}</td>
                  <td>{item.maritalStatus}</td>
                  <td>{item.children}</td>
                  <td>{item.cellphone}</td>
                  <td>{item.profession}</td>
                  <td>{item.companyName}</td>
                  <td>{item.companyAddress}</td>
                  <td>{item.companyPhone}</td>
                  <td>{item.email}</td>
                  <td>{item.facebookUser}</td>
                  <td>{item.instagramUser}</td>
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

export default CandidatesTable;
