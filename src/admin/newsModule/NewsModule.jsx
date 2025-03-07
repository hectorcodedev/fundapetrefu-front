import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import NewsTable from "./NewsTable";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import "./newsModule.css";

// const baseUrl = "http://localhost:3333";
// const customersUrl = `${baseUrl}/news`;
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
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    setEditItemId(id);
    const item = data.find((item) => item.id === id);
    reset(item);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Estás seguro(a) de eliminar?");
    if (confirmDelete) {
      try {
        await api.delete(`${customersUrl}/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReset = () => {
    setEditItemId(null);
    reset({
      newsTitle: "",
      newsContent: "",
      newsImg: "",
    });
  };

  const onSubmit = async (formData) => {
    if (editItemId) {
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formData);
        setData(
          data.map((item) => {
            if (item.id === editItemId) {
              return {
                ...item,
                newsTitle: formData.newsTitle,
                newsContent: formData.newsContent,
                newsImg: formData.newsImg,
              };
            } else {
              return item;
            }
          })
        );
        setEditItemId(null);
      } catch (error) {
        console.log(error);
      }
      setShowModal(false);
    } else {
      try {
        let newItem;
        if (!formData.id) {
          newItem = {
            ...formData,
            id: uuidv4(),
          };
        } else {
          newItem = formData;
        }
        const response = await api.post(customersUrl, newItem);
        newItem = response.data;
        setData([...data, newItem]);
      } catch (error) {
        console.log(error);
      }
      setShowModal(false);
    }
    reset();
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Noticias</h3>
        <button
          className="btn btn-success ms-3"
          onClick={() => setShowModal(true)}
        >
          <FaPlusSquare />
        </button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="myModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingrese los datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-3">
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-2 m-1">
                  <input type="hidden" {...register("id")} />
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                  <div className="col-auto m-1">
                    <input
                      {...register("newsTitle", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="newsTitle"
                      type="text"
                      className="form-control"
                      placeholder="* Titulo Noticia"
                    />
                    {errors.newsTitle && (
                      <p className="errorMsg">{errors.newsTitle.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("newsContent", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="newsContent"
                      type="text"
                      className="form-control"
                      placeholder="* Contenido Noticia"
                    />
                    {errors.newsContent && (
                      <p className="errorMsg">{errors.newsContent.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("newsImg", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="newsImg"
                      type="text"
                      className="form-control"
                      placeholder="* Imagen Noticia"
                    />
                    {errors.newsImg && (
                      <p className="errorMsg">{errors.newsImg.message}</p>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-primary" type="submit">
                    {editItemId ? "Guardar" : "Crear"}
                  </button>

                  <button
                    className="btn btn-danger ms-3"
                    type="button"
                    onClick={handleReset}
                  >
                    Resetear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {loading ? (
        <Loader />
      ) : (
        <NewsTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default NewsModule;
