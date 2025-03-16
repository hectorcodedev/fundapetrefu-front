import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTimes } from "react-icons/fa";

const paginationOptions = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const SurveysTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  const columns = [
    { name: "ID", selector: row => row.id, sortable: true, center: true },
    { name: "Documento", selector: row => row.dniNumber, sortable: true },
    { name: "Composición Familiar", selector: row => row.familyComposition, sortable: true },
    { name: "Cant. Adultos", selector: row => row.adultsQty, sortable: true },
    { name: "Cant. Niños", selector: row => row.childrenQty, sortable: true },
    { name: "Cant. Bebés", selector: row => row.babiesQty, sortable: true },
    { name: "Tipo Vivienda", selector: row => row.houseType, sortable: true },
    { name: "Tiempo Solo", selector: row => row.timeAlone, sortable: true },
    { name: "Niños Pequeños", selector: row => row.anyKids, sortable: true },
    { name: "Edades", selector: row => row.childrenAges, sortable: false, wrap: true },
    { name: "Razón Adopción", selector: row => row.reasons, sortable: false, wrap: true },
    { name: "Otra Razón", selector: row => row.reasonsOther, sortable: false, wrap: true },
    { name: "Tuvo Mascota", selector: row => row.hadPet, sortable: true },
    { name: "Razón No Tiene", selector: row => row.hadPetOther, sortable: false, wrap: true },
    { name: "Tienes Mascotas", selector: row => row.havePet, sortable: true },
    { name: "Características", selector: row => row.havePetOther, sortable: false, wrap: true },
    { name: "Cómo te enteraste", selector: row => row.getFundapetInfo, sortable: true },
    { name: "Razón Adoptar", selector: row => row.adoptReason, sortable: false, wrap: true },
    { name: "Nombre Ref1", selector: row => row.ref1Name, sortable: true },
    { name: "Número Ref1", selector: row => row.ref1Cellphone, sortable: true },
    { name: "Nombre Ref2", selector: row => row.ref2Name, sortable: true },
    { name: "Número Ref2", selector: row => row.ref2Cellphone, sortable: true },
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

export default SurveysTable;
