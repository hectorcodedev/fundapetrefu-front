import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const CandidatesTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    { name: "ID", selector: row => row.id, sortable: true, center: true },
    { name: "Nombres", selector: row => row.firstName, sortable: true },
    { name: "Apellidos", selector: row => row.lastName, sortable: true },
    { name: "Tipo", selector: row => row.dniType, sortable: true },
    { name: "Número", selector: row => row.dniNumber, sortable: true },
    { name: "Edad", selector: row => row.age, sortable: true },
    { name: "Dirección", selector: row => row.address, sortable: false, wrap: true },
    { name: "Barrio", selector: row => row.neighborhood, sortable: true },
    { name: "Localidad", selector: row => row.locality, sortable: true },
    { name: "Estrato", selector: row => row.stratum, sortable: true },
    { name: "Estado Civil", selector: row => row.maritalStatus, sortable: true },
    { name: "Hijos", selector: row => row.children, sortable: true },
    { name: "Celular", selector: row => row.cellphone, sortable: true },
    { name: "Ocupación", selector: row => row.profession, sortable: true },
    { name: "Nombre Empresa", selector: row => row.companyName, sortable: true },
    { name: "Dirección Empresa", selector: row => row.companyAddress, sortable: false, wrap: true },
    { name: "Teléfono Empresa", selector: row => row.companyPhone, sortable: true },
    { name: "Correo", selector: row => row.email, sortable: true },
    { name: "Facebook", selector: row => row.facebookUser, sortable: true },
    { name: "Instagram", selector: row => row.instagramUser, sortable: true },
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

export default CandidatesTable;