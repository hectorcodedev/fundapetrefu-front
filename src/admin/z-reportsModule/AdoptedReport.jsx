import React, { useState, useEffect } from "react";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { Loader } from "../../admin";
import { api } from "../api";

// const baseUrl = "http://localhost:3333";
// const customersUrl = `${baseUrl}/pets/adopted`;
const customersUrl = "/pets/adopted";

const AdoptedReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(customersUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <h3 className="mt-5 text-center">Informe Mascotas Adoptadas</h3>
      <div className="row d-flex justify-content-center mt-5">
        <div
          className="table-responsive"
          style={{ width: 95 + "%", fontSize: 80 + "%" }}
        >
          {loading ? (
            <Loader />
          ) : (
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
                  <th className="text-center">Documento Adoptante</th>
                  <th className="text-center">Descripción</th>
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
                    <td>{item.adopterDniNumber}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptedReport;
