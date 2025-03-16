import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { Loader } from "../../admin";
import { api } from "../api";

const customersUrl = "/pets/featured";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const FeaturedReport = () => {
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

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.petName, sortable: true },
    { name: "Edad", selector: (row) => row.petAge, sortable: true },
    { name: "Género", selector: (row) => row.petGender, sortable: true },
    { name: "Especie", selector: (row) => row.petSpecies, sortable: true },
    { name: "Tamaño", selector: (row) => row.petSize, sortable: true },
    { name: "Condición Especial", selector: (row) => row.petSpecialCondition, sortable: true },
    { name: "Adoptado?", selector: (row) => (row.isAdopted ? "Sí" : "No"), sortable: true },
    { name: "Destacado?", selector: (row) => (row.isFeatured ? "Sí" : "No"), sortable: true },
    { name: "Imagen Destacada", selector: (row) => row.featuredImg, sortable: false, wrap: true },
    { name: "Descripción", selector: (row) => row.description, sortable: false, wrap: true }
  ];

  return (
    <div>
      <NavbarAdmin />
      <h3 className="mt-5 text-center">Informe Mascotas Destacadas</h3>
      <div className="container mt-4">
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={paginationOptions}
            defaultSortFieldId={1}
            highlightOnHover
            striped
            noDataComponent="No hay registros para mostrar"
          />
        )}
      </div>
    </div>
  );
};

export default FeaturedReport;