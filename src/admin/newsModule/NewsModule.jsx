import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import NewsTable from "./NewsTable";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import Swal from "sweetalert2";
import "./newsModule.css";

const customersUrl = "/news";

const NewsModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newsTitle: "",
      newsContent: "",
      newsImg: "",
    },
  });

  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(customersUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al obtener noticias:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    setEditItemId(id);
    const item = data.find((item) => item.id === id);
    reset(item);
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
          title: "Noticia Eliminada",
          text: "La noticia fue eliminada correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar noticia:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la noticia.",
        });
      }
    }
  };

  const handleReset = () => {
    setEditItemId(null);
    reset();
  };

  const handleOpenModal = () => {
    setEditItemId(null); // Se asegura de que no haya ninguna edición activa
    reset({
      newsTitle: "",
      newsContent: "",
      newsImg: "",
    });
    setShowModal(true);
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
          title: "Noticia Actualizada",
          text: "Los datos de la noticia fueron modificados correctamente.",
        });
        setEditItemId(null);
      } catch (error) {
        console.error("Error al actualizar noticia:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la noticia.",
        });
      }
    } else {
      try {
        const newItem = { ...formData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);
        Swal.fire({
          icon: "success",
          title: "Noticia Creada",
          text: "Se agregó la noticia correctamente.",
        });
      } catch (error) {
        console.error("Error al crear noticia:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo crear la noticia.",
        });
      }
    }
    setShowModal(false);
    reset();
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Noticias</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      {/* 📝 Modal para Crear/Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Noticia" : "Agregar Noticia"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                {[
                  { name: "newsTitle", label: "Título Noticia (*)", type: "text", required: true },
                  { name: "newsContent", label: "Contenido (*)", type: "text", required: true },
                  { name: "newsImg", label: "Imagen Noticia (*)", type: "text", required: true },
                ].map((field, index) => (
                  <div key={index} className="col-md-12 mb-3">
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

      {/* 📋 Tabla de Noticias */}
      {loading ? <Loader /> : <NewsTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal} />}
    </div>
  );
};

export default NewsModule;
