import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ShelterInfoTable from "./ShelterInfoTable";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import Swal from "sweetalert2";
import "./shelterInfoModule.css";

const customersUrl = "/shelter-contents";

const ShelterInfoModule = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(customersUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setEditItemId(null);
    reset();
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setEditItemId(id);
    const item = data.find((item) => item.id === id);
    Object.keys(item).forEach((key) => setValue(key, item[key]));
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`${customersUrl}/${id}`);
          setData(data.filter((item) => item.id !== id));
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  const handleReset = () => {
    setEditItemId(null);
    reset();
  };

  const onSubmit = async (formData) => {
    try {
      if (editItemId) {
        await api.patch(`${customersUrl}/${editItemId}`, formData);
        setData(data.map((item) => (item.id === editItemId ? { ...item, ...formData } : item)));
        Swal.fire("Guardado!", "La información ha sido actualizada.", "success");
      } else {
        const newItem = { ...formData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);
        Swal.fire("Creado!", "El registro ha sido añadido.", "success");
      }
      setShowModal(false);
      reset();
      setEditItemId(null);
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire("Error!", "Hubo un problema al guardar los datos.", "error");
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Nosotros</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Información" : "Agregar Información"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                {[
                  { name: "infoTitle", label: "Título (*)", type: "text", required: true },
                  { name: "infoImgLink", label: "Imagen (*)", type: "text", required: true },
                  { name: "infoContent", label: "Contenido (*)", type: "text", required: true },
                ].map((field, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <label className="form-label">{field.label}</label>
                    <input
                      {...register(field.name, field.required ? { required: `${field.label} es obligatorio` } : {})}
                      type={field.type}
                      className="form-control"
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

      {loading ? <Loader /> : <ShelterInfoTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal} />}
    </div>
  );
};

export default ShelterInfoModule;
