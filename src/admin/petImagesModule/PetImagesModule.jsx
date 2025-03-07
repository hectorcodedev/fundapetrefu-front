import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import PetImagesTable from "./PetImagesTable";
import { api } from "../api";
import "./petImagesModule.css";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import "./petImagesModule.css";

// const baseUrl = "http://localhost:3333";
// const customersUrl = `${baseUrl}/pet-images`;
const customersUrl = "/pet-images";

const PetImagesModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      petImageName: "",
      petImageLink: "",
      petImageDescription: "",
      petId: "",
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
    // Set editItemId to the ID of the item being edited
    setEditItemId(id);

    // Find item with matching ID in data array
    const item = data.find((item) => item.id === id);

    // Pre-populate form fields with item data
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
      petImageName: "",
      petImageLink: "",
      petImageDescription: "",
      petId: "",
    });
  };

  const onSubmit = async (formData) => {
    // Update or create item with form data
    if (editItemId) {
      // Editing existing item
      try {
        await api.patch(`${customersUrl}/${editItemId}`, formData);
        setData(
          data.map((item) => {
            if (item.id === editItemId) {
              return {
                ...item,
                petImageName: formData.petImageName,
                petImageLink: formData.petImageLink,
                petImageDescription: formData.petImageDescription,
                petId: formData.petId,
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
      // Creating new item
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
    // Reset form fields
    reset();
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="d-flex justify-content-center align-items-end">
        <h3 className="mt-5 text-center">Módulo Imágenes Mascotas</h3>
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
                      {...register("petImageName", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="petImageName"
                      type="text"
                      className="form-control"
                      placeholder="* Nombre Imagen"
                    />
                    {errors.petImageName && (
                      <p className="errorMsg">{errors.petImageName.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("petImageLink", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="petImageLink"
                      type="text"
                      className="form-control"
                      placeholder="* Link Imagen"
                    />
                    {errors.petImageLink && (
                      <p className="errorMsg">{errors.petImageLink.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("petImageDescription", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="petImageDescription"
                      type="text"
                      className="form-control"
                      placeholder="* Descripción Imagen"
                    />
                    {errors.petImageDescription && (
                      <p className="errorMsg">
                        {errors.petImageDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("petName", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 3,
                          message: "Mínimo tres caracteres",
                        },
                      })}
                      name="petName"
                      type="text"
                      className="form-control"
                      placeholder="* Nombre Mascota"
                    />
                    {errors.petName && (
                      <p className="errorMsg">{errors.petName.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
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
        <PetImagesTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default PetImagesModule;
