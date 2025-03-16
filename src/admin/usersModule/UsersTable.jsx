import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes, FaUnlock } from "react-icons/fa";
import { api } from "../api"; // Asegúrate de importar tu API para hacer la solicitud

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const UsersTable = ({ data, handleEdit, handleDelete, setShowModal }) => {

  const handleResetPassword = async (dniNumber) => {
    try {
      const dniNumberAsNumber = Number(dniNumber);
      const response = await api.post(`/users/reset-password`, { dniNumber: dniNumberAsNumber });
      alert("Contraseña restaurada con éxito");
    } catch (error) {
      alert("Error al restaurar la contraseña");
      console.error(error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contraseña",
      selector: (row) => row.password,
      sortable: false,
      minWidth: "150px",
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
      name: "Documento",
      selector: (row) => row.dniNumber,
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
      name: "Restaurar Contraseña",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-warning"
          onClick={() => handleResetPassword(row.dniNumber)}  // Pasar dniNumber al hacer clic
        >
          <FaUnlock />
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

export default UsersTable;
