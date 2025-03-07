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

// const baseUrl = "http://localhost:3333";
// const customersUrl = `${baseUrl}/pets`;
const customersUrl = "/pets";

const PetsModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      adopterId: "",
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
        // Remove item with matching ID from data array
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
      adopterId: "",
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
                petName: formData.petName,
                petAge: formData.petAge,
                petGender: formData.petGender,
                petSpecies: formData.petSpecies,
                petSize: formData.petSize,
                petSpecialCondition: formData.petSpecialCondition,
                isAdopted: formData.isAdopted,
                isFeatured: formData.isFeatured,
                featuredImg: formData.featuredImg,
                description: formData.description,
                adopterId: formData.adopterId,
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
        <h3 className="mt-5 text-center">Módulo Mascotas</h3>
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
                    <select
                      {...register("petAge", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="petAge"
                      type="text"
                    >
                      <optgroup>
                        {petAgeOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.petAge && (
                      <p className="errorMsg">{errors.petAge.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("petGender", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="petGender"
                      type="text"
                    >
                      <optgroup>
                        {petGenderOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.petGender && (
                      <p className="errorMsg">{errors.petGender.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("petSpecies", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="petSpecies"
                      type="text"
                    >
                      <optgroup>
                        {petSpeciesOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.petSpecies && (
                      <p className="errorMsg">{errors.petSpecies.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("petSize", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="petSize"
                      type="text"
                    >
                      <optgroup>
                        {petSizeOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.petSize && (
                      <p className="errorMsg">{errors.petSize.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("petSpecialCondition", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="petSpecialCondition"
                      type="text"
                    >
                      <optgroup>
                        {petSpecialConditionOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.petSpecialCondition && (
                      <p className="errorMsg">
                        {errors.petSpecialCondition.message}
                      </p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("isAdopted", {
                        setValueAs: (value) =>
                          value === "true" ? true : false,
                      })}
                      className="w-100 form-select"
                      name="isAdopted"
                      type="text"
                    >
                      <optgroup>
                        {isAdoptedOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.isAdopted && (
                      <p className="errorMsg">{errors.isAdopted.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("isFeatured", {
                        setValueAs: (value) =>
                          value === "true" ? true : false,
                      })}
                      className="w-100 form-select"
                      name="isFeatured"
                      type="text"
                    >
                      <optgroup>
                        {isFeaturedOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.isFeatured && (
                      <p className="errorMsg">{errors.isFeatured.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("featuredImg")}
                      name="featuredImg"
                      type="text"
                      className="form-control"
                      placeholder="Imagen Destacada"
                    />
                    {errors.featuredImg && (
                      <p className="errorMsg">{errors.featuredImg.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("description", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="description"
                      type="text"
                      className="form-control"
                      placeholder="* Descripción"
                    />
                    {errors.description && (
                      <p className="errorMsg">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("adopterDniNumber", {
                        minLength: {
                          value: 7,
                          message: "Mínimo siete caracteres",
                        },
                        valueAsNumber: true,
                      })}
                      name="adopterDniNumber"
                      type="number"
                      className="form-control"
                      placeholder="Doc.Adoptante"
                    />
                    {errors.adopterDniNumber && (
                      <p className="errorMsg">
                        {errors.adopterDniNumber.message}
                      </p>
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
        <PetsTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default PetsModule;
