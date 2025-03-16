import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const SupportersTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Tipo Documento",
      selector: (row) => row.dniType,
      sortable: true,
    },
    {
      name: "Número Documento",
      selector: (row) => row.dniNumber,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.cellphone,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Ayuda",
      selector: (row) => row.supportAlternatives,
      sortable: false,
      wrap: true,
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

export default SupportersTable;
