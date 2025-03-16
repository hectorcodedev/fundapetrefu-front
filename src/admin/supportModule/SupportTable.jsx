import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const SupportTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Título", selector: (row) => row.supportTitle, sortable: true },
    { name: "Contenido", selector: (row) => row.supportContent, sortable: true, wrap: true },
    { name: "Imagen", selector: (row) => row.supportImg, sortable: false, wrap: true },
    { name: "Link", selector: (row) => row.supportLink, sortable: false, wrap: true },
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
        <button
          className="btn btn-danger"
          onClick={() => {
            Swal.fire({
              title: "¿Estás seguro?",
              text: "No podrás revertir esto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Sí, eliminar!",
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(row.id);
                Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
              }
            });
          }}
        >
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

export default SupportTable;
