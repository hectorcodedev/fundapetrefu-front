import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import AdoptersTable from "./AdoptersTable";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import Swal from "sweetalert2";
import "./adoptersModule.css";

const customersUrl = "/adopters";

const AdoptersModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(customersUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    setEditItemId(id);
    const item = data.find((item) => item.id === id);
    reset(item);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setEditItemId(null);
    reset({
      adopterDniNumber: "",
      adopterFirstName: "",
      adopterLastName: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      try {
        await api.delete(`${customersUrl}/${id}`);
        setData(data.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Adoptante Eliminado",
          text: "El adoptante fue eliminado correctamente.",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el adoptante.",
        });
      }
    }
  };

  const handleReset = () => {
    setEditItemId(null);
    reset();
  };

  const onSubmit = async (formData) => {
    if (editItemId) {
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formData);
        setData(
          data.map((item) =>
            item.id === editItemId ? { ...item, ...formData } : item
          )
        );
        Swal.fire({
          icon: "success",
          title: "Adoptante Actualizado",
          text: "Los datos del adoptante fueron modificados correctamente.",
        });
        setEditItemId(null);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el adoptante.",
        });
      }
    } else {
      try {
        let newItem = { ...formData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);

        Swal.fire({
          icon: "success",
          title: "Adoptante Creado",
          text: "Se agregó el adoptante correctamente.",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo crear el adoptante.",
        });
      }
    }
    setShowModal(false);
    reset();
  };

  const filteredData = data.filter((adopter) =>
    adopter.adopterFirstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Adoptantes</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      {/* 🔎 Búsqueda */}
      <div className="d-flex justify-content-center my-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar adoptante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning ms-2" onClick={() => setSearch("")}>
          Limpiar
        </button>
      </div>

      {/* 📝 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Adoptante" : "Agregar Adoptante"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                {[
                  { name: "adopterDniNumber", label: "Número Documento (*)", type: "number", required: true },
                  { name: "adopterFirstName", label: "Nombres (*)", type: "text", required: true },
                  { name: "adopterLastName", label: "Apellidos (*)", type: "text", required: true },
                ].map((field, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <label className="form-label">{field.label}</label>
                    <input
                      {...register(field.name, { required: `${field.label} es obligatorio` })}
                      type={field.type}
                      className="form-control"
                      onChange={(e) => {
                        if (field.name === "adopterFirstName" || field.name === "adopterLastName") {
                          e.target.value = e.target.value.toUpperCase();
                        }
                      }}
                    />
                    {errors[field.name] && <p className="errorMsg">{errors[field.name].message}</p>}
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-12 text-center mt-3">
                  <button className="btn btn-primary me-2" type="submit">
                    {editItemId ? "Guardar" : "Crear"}
                  </button>
                  <button className="btn btn-danger" type="button" onClick={handleReset}>
                    Resetear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* 📋 Tabla de Adoptantes */}
      {loading ? <Loader /> : <AdoptersTable data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal}  />}
    </div>
  );
};

export default AdoptersModule;
