import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import PetsTable from "./PetsTable";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import {
  petAgeOptions,
  petGenderOptions,
  petSpeciesOptions,
  petSizeOptions,
  petSpecialConditionOptions,
  isAdoptedOptions,
  isFeaturedOptions,
} from "./options";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import "./petsModule.css";
import Swal from "sweetalert2";

const customersUrl = "/pets";

const PetsModule = () => {
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
  const [filterGender, setFilterGender] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");

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
      petName: "",
      petAge: "",
      petGender: "",
      petSpecies: "",
      petSize: "",
      petSpecialCondition: "",
      isAdopted: "",
      isFeatured: "",
      featuredImg: "",
      description: "",
      adopterDniNumber: ""
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
          title: "Mascota Eliminada",
          text: "La mascota fue eliminada correctamente.",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la mascota.",
        });
      }
    }
  };

  const handleReset = () => {
    setEditItemId(null);
    reset();
  };

  const onSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      isAdopted: formData.isAdopted === "true",
      isFeatured: formData.isFeatured === "true",
      adopterDniNumber: formData.adopterDniNumber
        ? Number(formData.adopterDniNumber)
        : null,
    };

    if (editItemId) {
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formattedData);
        setData(
          data.map((item) =>
            item.id === editItemId ? { ...item, ...formattedData } : item
          )
        );
        Swal.fire({
          icon: "success",
          title: "Mascota Actualizada",
          text: "Los datos de la mascota fueron modificados correctamente.",
        });
        setEditItemId(null);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la mascota.",
        });
      }
    } else {
      try {
        let newItem = { ...formattedData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);

        Swal.fire({
          icon: "success",
          title: "Mascota Creada",
          text: "Se agregó la mascota correctamente.",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo crear la mascota.",
        });
      }
    }
    setShowModal(false);
    reset();
  };

  const filteredData = data.filter((pet) => {
    return (
      (search === "" || pet.petName.toLowerCase().includes(search.toLowerCase())) &&
      (filterGender === "" || pet.petGender === filterGender) &&
      (filterSpecies === "" || pet.petSpecies === filterSpecies)
    );
  });

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Mascotas</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      {/* 🔎 Búsqueda y Filtros */}
      <div className="d-flex flex-wrap justify-content-center my-3">
        <input
          type="text"
          className="form-control w-25 mx-2"
          placeholder="Buscar mascota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-select mx-2 w-25" onChange={(e) => setFilterGender(e.target.value)}>
          <option value="">Todos los géneros</option>
          {petGenderOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select className="form-select mx-2 w-25" onChange={(e) => setFilterSpecies(e.target.value)}>
          <option value="">Todas las especies</option>
          {petSpeciesOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button className="btn btn-warning mx-2" onClick={() => {
          setSearch("");
          setFilterGender("");
          setFilterSpecies("");
        }}>
          Limpiar Filtros
        </button>
      </div>

      {/* 📝 Modal para Crear/Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Mascota" : "Agregar Mascota"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                {[
                  { name: "petName", label: "Nombre Mascota (*)", type: "text", options: null, required: true },
                  { name: "petAge", label: "Edad (*)", type: "select", options: petAgeOptions, required: true },
                  { name: "petGender", label: "Género (*)", type: "select", options: petGenderOptions, required: true },
                  { name: "petSpecies", label: "Especie (*)", type: "select", options: petSpeciesOptions, required: true },
                  { name: "petSize", label: "Tamaño (*)", type: "select", options: petSizeOptions, required: true },
                  { name: "petSpecialCondition", label: "Condición Especial (*)", type: "select", options: petSpecialConditionOptions, required: true },
                  { name: "isAdopted", label: "¿Adoptado? (*)", type: "select", options: isAdoptedOptions, required: true },
                  { name: "isFeatured", label: "¿Destacado? (*)", type: "select", options: isFeaturedOptions, required: true },
                  { name: "featuredImg", label: "Imagen Destacada", type: "text", options: null, required: false },
                  { name: "description", label: "Descripción (*)", type: "text", options: null, required: true },
                  { name: "adopterDniNumber", label: "Doc. Adoptante", type: "number", options: null, required: false },
                ].map((field, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <label className="form-label">{field.label}</label>
                    {field.type === "select" ? (
                      <select {...register(field.name)} className="form-select">
                        <option value="">Seleccione uno...</option>
                        {field.options.map((option, i) => (
                          <option key={i} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...register(field.name, field.required ? { required: `${field.label} es obligatorio` } : {})}
                        type={field.type}
                        className="form-control"
                        onChange={(e) => {
                          if (field.name === "petName") {
                            e.target.value = e.target.value.toUpperCase(); // Convierte a mayúsculas
                          }
                        }}
                      />
                    )}
                    {errors[field.name] && <p className="errorMsg">{errors[field.name].message}</p>}
                  </div>
                ))}
              </div>

              {/* Botones en una fila separada */}
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

      {/* 📋 Tabla de Mascotas */}
      {loading ? <Loader /> : <PetsTable data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal} />}
    </div>
  );
};

export default PetsModule;
