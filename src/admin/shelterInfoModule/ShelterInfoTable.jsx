import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const ShelterInfoTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Título",
      selector: (row) => row.infoTitle,
      sortable: true,
    },
    {
      name: "Imagen",
      selector: (row) => row.infoImgLink,
      cell: (row) =>
        row.infoImgLink ? (
          <img
            src={row.infoImgLink}
            alt="Noticia"
            className="img-fluid rounded"
            style={{ maxWidth: "80px", maxHeight: "80px" }}
          />
        ) : (
          "No imagen"
        ),
      sortable: false,
    },
    {
      name: "Contenido",
      selector: (row) => row.infoContent,
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

export default ShelterInfoTable;