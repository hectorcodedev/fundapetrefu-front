import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const SurveysTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
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
                <th className="text-center">Documento</th>
                <th className="text-center">Composición Familiar</th>
                <th className="text-center">Cant. Adultos</th>
                <th className="text-center">Cant. Niños</th>
                <th className="text-center">Cant. Bebés</th>
                <th className="text-center">Tipo Vivienda</th>
                <th className="text-center">Tiempo Solo</th>
                <th className="text-center">Niños Pequeños</th>
                <th className="text-center">Edades</th>
                <th className="text-center">Razón Adopción</th>
                <th className="text-center">Otra Razón</th>
                <th className="text-center">Tuvo Mascota</th>
                <th className="text-center">Razón No Tiene</th>
                <th className="text-center">Tienes Mascotas</th>
                <th className="text-center">Características</th>
                <th className="text-center">Cómo te enteraste</th>
                <th className="text-center">Razón Adoptar</th>
                <th className="text-center">Nombre Ref1</th>
                <th className="text-center">Numero Ref1</th>
                <th className="text-center">Nombre Ref2</th>
                <th className="text-center">Número Ref2</th>
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
                  <td>{item.dniNumber}</td>
                  <td>{item.familyComposition}</td>
                  <td>{item.adultsQty}</td>
                  <td>{item.childrenQty}</td>
                  <td>{item.babiesQty}</td>
                  <td>{item.houseType}</td>
                  <td>{item.timeAlone}</td>
                  <td>{item.anyKids}</td>
                  <td>{item.childrenAges}</td>
                  <td>{item.reasons}</td>
                  <td>{item.reasonsOther}</td>
                  <td>{item.hadPet}</td>
                  <td>{item.hadPetOther}</td>
                  <td>{item.havePet}</td>
                  <td>{item.havePetOther}</td>
                  <td>{item.getFundapetInfo}</td>
                  <td>{item.adoptReason}</td>
                  <td>{item.ref1Name}</td>
                  <td>{item.ref1Cellphone}</td>
                  <td>{item.ref2Name}</td>
                  <td>{item.ref2Cellphone}</td>
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

export default SurveysTable;
