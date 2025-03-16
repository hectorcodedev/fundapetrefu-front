import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import SupportTable from "./SupportTable";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import Swal from "sweetalert2";
import "./supportModule.css";

const customersUrl = "/supports";

const SupportModule = () => {
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
      returnFocus: false, // Opcional: evita problemas con el foco
    }).then((result) => result);

    if (confirmResult.isDismissed) {
      try {
        await api.delete(`${customersUrl}/${id}`);
        // Esperar la respuesta antes de actualizar el estado
        setData((prevData) => prevData.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Soporte Eliminado",
          text: "El soporte fue eliminado correctamente.",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el soporte.",
        });
      }
    }
  };

  const handleOpenModal = () => {
    setEditItemId(null);
    reset({ supportTitle: "", supportContent: "", supportImg: "", supportLink: "" });
    setShowModal(true);
  };

  const onSubmit = async (formData) => {
    if (editItemId) {
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formData);
        setData(data.map((item) => (item.id === editItemId ? { ...item, ...formData } : item)));
        Swal.fire("Actualizado", "Los datos fueron modificados correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el registro.", "error");
      }
    } else {
      try {
        let newItem = { ...formData, id: uuidv4() };
        const response = await api.post(customersUrl, newItem);
        setData([...data, response.data]);
        Swal.fire("Creado", "Se agregó el registro correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo crear el registro.", "error");
      }
    }
    setShowModal(false);
    reset();
  };

  const filteredData = data.filter((item) => item.supportTitle.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Ayúdanos</h3>
        <button className="btn btn-success ms-3" onClick={handleOpenModal}>
          <FaPlusSquare />
        </button>
      </div>

      <div className="d-flex justify-content-center my-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning ms-2" onClick={() => setSearch("")}>Limpiar</button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="myModal">
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Editar Registro" : "Agregar Registro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input {...register("supportTitle", { required: "Campo obligatorio" })} className="form-control" />
              {errors.supportTitle && <p className="errorMsg">{errors.supportTitle.message}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contenido</label>
              <input {...register("supportContent", { required: "Campo obligatorio" })} className="form-control" />
              {errors.supportContent && <p className="errorMsg">{errors.supportContent.message}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input {...register("supportImg")} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Link</label>
              <input {...register("supportLink")} className="form-control" />
            </div>

            <div className="text-center">
              <button className="btn btn-primary me-2" type="submit">{editItemId ? "Guardar" : "Crear"}</button>
              <button className="btn btn-danger" type="button" onClick={() => reset()}>Resetear</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {loading ? <Loader /> : <SupportTable data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} setShowModal={setShowModal} />}
    </div>
  );
};

export default SupportModule;