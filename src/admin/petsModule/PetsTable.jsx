import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const PetsTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.petName,
      sortable: true,
    },
    {
      name: "Edad",
      selector: (row) => row.petAge,
      sortable: true,
    },
    {
      name: "Género",
      selector: (row) => row.petGender,
      sortable: true,
    },
    {
      name: "Especie",
      selector: (row) => row.petSpecies,
      sortable: true,
    },
    {
      name: "Tamaño",
      selector: (row) => row.petSize,
      sortable: true,
    },
    {
      name: "Condición Especial",
      selector: (row) => row.petSpecialCondition,
      sortable: true,
    },
    {
      name: "Adoptado?",
      selector: (row) => (row.isAdopted ? "Sí" : "No"),
      sortable: true,
    },
    {
      name: "Destacado?",
      selector: (row) => (row.isFeatured ? "Sí" : "No"),
      sortable: true,
    },
    {
      name: "Imagen Destacada",
      selector: (row) => row.featuredImg,
      sortable: false,
      wrap: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: false,
      wrap: true,
    },
    {
      name: "Doc. Adoptante",
      selector: (row) => row.adopterDniNumber,
      sortable: true,
    },
    {
      name: "Editar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowModal(true);
            handleEdit(row.id);
          }}
        >
          <FaEdit />
        </button>
      ),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
          <FaTimes />
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
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
    </div>
  );
};

export default PetsTable;