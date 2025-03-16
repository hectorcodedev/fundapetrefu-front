import React, { useState, useEffect } from "react";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UsersTable from "./UsersTable";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import Swal from "sweetalert2";
import "./usersModule.css";

const customersUrl = "/users";

const UsersModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dniNumber: "",
    },
  });

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
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dniNumber: "",
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
        Swal.fire("Eliminado", "Usuario eliminado correctamente.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  const handleReset = () => {
    setEditItemId(null);
    reset();
  };

  const fieldLabels = {
    email: "Correo Electrónico",
    password: "Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    dniNumber: "Número de DNI"
  };

  const onSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      dniNumber: formData.dniNumber ? Number(formData.dniNumber) : null,
    };

    if (editItemId) {
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formattedData);
        setData(data.map((item) => (item.id === editItemId ? { ...item, ...formattedData } : item)));
        Swal.fire("Actualizado", "Usuario actualizado correctamente.", "success");
        setEditItemId(null);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
      }
    } else {
      try {
        let newItem = { ...formattedData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);
        Swal.fire("Creado", "Usuario agregado correctamente.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo crear el usuario.", "error");
      }
    }
    setShowModal(false);
    reset();
  };

  const filteredData = data.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Usuarios</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-center my-3">
        <input
          type="text"
          className="form-control w-25 mx-2"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning mx-2" onClick={() => setSearch("")}>Limpiar</button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {["email", "firstName", "lastName", "dniNumber", ...(editItemId ? [] : ["password"])].map((field, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <label className="form-label">{fieldLabels[field] || field}</label>
                  <input
                    {...register(field, { required: `${fieldLabels[field] || field} es obligatorio` })}
                    type={field === "dniNumber" ? "number" : field === "password" ? "password" : "text"}
                    className="form-control"
                    autoComplete="off"
                  />
                  {errors[field] && <p className="errorMsg">{errors[field].message}</p>}
                </div>
              ))}
            </div>
            <button className="btn btn-primary me-2" type="submit">
              {editItemId ? "Guardar" : "Crear"}
            </button>
            <button className="btn btn-danger" type="button" onClick={handleReset}>
              Resetear
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {loading ? <Loader /> : <UsersTable data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal} />}
    </div>
  );
};

export default UsersModule;