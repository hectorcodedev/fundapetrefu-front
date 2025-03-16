import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const PetImagesTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    { name: "ID", selector: row => row.id, sortable: true, center: true },
    { name: "Nombre Imagen", selector: row => row.petImageName, sortable: true },
    { 
      name: "Link", 
      selector: row => row.petImageLink, 
      sortable: true,
      cell: row => <a href={row.petImageLink} target="_blank" rel="noopener noreferrer">Ver Imagen</a>
    },
    { name: "Descripción", selector: row => row.petImageDescription, sortable: false, wrap: true },
    { name: "Mascota", selector: row => row.petName, sortable: true },
    { 
      name: "Editar", 
      button: true, 
      cell: row => (
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowModal(true);
            handleEdit(row.id);
          }}
        >
          <FaEdit />
        </button>
      )
    },
    { 
      name: "Eliminar", 
      button: true, 
      cell: row => (
        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
          <FaTimes />
        </button>
      )
    }
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

export default PetImagesTable;
