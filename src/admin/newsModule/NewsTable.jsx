import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const NewsTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Título",
      selector: (row) => row.newsTitle,
      sortable: true,
      wrap: true,
    },
    {
      name: "Contenido",
      selector: (row) => row.newsContent,
      sortable: false,
      wrap: true,
    },
    {
      name: "Imagen",
      selector: (row) => row.newsImg,
      cell: (row) =>
        row.newsImg ? (
          <img
            src={row.newsImg}
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
      name: "Editar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-primary"
          title="Editar Noticia"
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
        <button className="btn btn-danger" title="Eliminar Noticia" onClick={() => handleDelete(row.id)}>
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

export default NewsTable;
