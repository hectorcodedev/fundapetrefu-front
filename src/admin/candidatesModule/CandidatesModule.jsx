import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  maritalStatusOptions,
  dniTypeOptions,
  stratumOptions,
  localityOptions,
} from "./options";
import CandidatesTable from "./CandidatesTable";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { api } from "../api";
import { Modal } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { Loader } from "../../admin";
import "./candidatesModule.css";

// const baseUrl = "http://localhost:3333";
// const customersUrl = `${baseUrl}/candidates`;
const customersUrl = "/candidates";

const CandidatesModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dniType: "",
      dniNumber: "",
      age: "",
      address: "",
      neighborhood: "",
      locality: "",
      stratum: "",
      maritalStatus: "",
      children: "",
      cellphone: "",
      profession: "",
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      email: "",
      facebookUser: "",
      instagramUser: "",
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
      firstName: "",
      lastName: "",
      dniType: "",
      dniNumber: "",
      age: "",
      address: "",
      neighborhood: "",
      locality: "",
      stratum: "",
      maritalStatus: "",
      children: "",
      cellphone: "",
      profession: "",
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      email: "",
      facebookUser: "",
      instagramUser: "",
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
                firstName: formData.firstName,
                lastName: formData.lastName,
                dniType: formData.dniType,
                dniNumber: formData.dniNumber,
                age: formData.age,
                address: formData.address,
                neighborhood: formData.neighborhood,
                locality: formData.locality,
                stratum: formData.stratum,
                maritalStatus: formData.maritalStatus,
                children: formData.children,
                cellphone: formData.cellphone,
                profession: formData.profession,
                companyName: formData.companyName,
                companyAddress: formData.companyAddress,
                companyPhone: formData.companyPhone,
                email: formData.email,
                facebookUser: formData.facebookUser,
                instagramUser: formData.instagramUser,
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
        <h3 className="mt-5 text-center">Módulo Candidatos</h3>
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
                      {...register("firstName", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="* Nombres"
                    />
                    {errors.firstName && (
                      <p className="errorMsg">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("lastName", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 5,
                          message: "Mínimo cinco caracteres",
                        },
                      })}
                      name="lastName"
                      type="text"
                      className="form-control"
                      placeholder="* Apellidos"
                    />
                    {errors.lastName && (
                      <p className="errorMsg">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("dniType", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="dniType"
                      type="text"
                    >
                      <optgroup>
                        {dniTypeOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.dniType && (
                      <p className="errorMsg">{errors.dniType.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("dniNumber", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 7,
                          message: "Mínimo siete dígitos",
                        },
                        valueAsNumber: true,
                      })}
                      name="dniNumber"
                      type="number"
                      className="form-control"
                      placeholder="* Número Documento"
                    />
                    {errors.dniNumber && (
                      <p className="errorMsg">{errors.dniNumber.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("email", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 7,
                          message: "Mínimo siete caracteres",
                        },
                      })}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="* Correo Electrónico"
                    />
                    {errors.email && (
                      <p className="errorMsg">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("age", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 1,
                          message: "Mínimo un dígito",
                        },
                        valueAsNumber: true,
                      })}
                      name="age"
                      type="number"
                      className="form-control"
                      placeholder="* Edad"
                    />
                    {errors.age && (
                      <p className="errorMsg">{errors.age.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("neighborhood", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="neighborhood"
                      type="text"
                      className="form-control"
                      placeholder="* Barrio"
                    />
                    {errors.neighborhood && (
                      <p className="errorMsg">{errors.neighborhood.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("locality", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="locality"
                      type="text"
                    >
                      <optgroup>
                        {localityOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.locality && (
                      <p className="errorMsg">{errors.locality.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("stratum", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="stratum"
                      type="text"
                    >
                      <optgroup>
                        {stratumOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.stratum && (
                      <p className="errorMsg">{errors.stratum.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("address", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="address"
                      type="text"
                      className="form-control"
                      placeholder="* Dirección"
                    />
                    {errors.address && (
                      <p className="errorMsg">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("children", {
                        required: "Este campo es requerido",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Valor no váido",
                        },
                        max: {
                          value: 99,
                          message: "Valor no válido",
                        },
                      })}
                      name="children"
                      type="number"
                      className="form-control"
                      placeholder="* Número Hijos"
                    />
                    {errors.children && (
                      <p className="errorMsg">{errors.children.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <select
                      {...register("maritalStatus", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="maritalStatus"
                      type="text"
                    >
                      <optgroup>
                        {maritalStatusOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.maritalStatus && (
                      <p className="errorMsg">{errors.maritalStatus.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("cellphone", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                          message: "Ingresar únicamente números",
                        },
                      })}
                      name="cellphone"
                      type="text"
                      className="form-control"
                      placeholder="* Número Celular"
                    />
                    {errors.cellphone && (
                      <p className="errorMsg">{errors.cellphone.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("profession", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="profession"
                      type="text"
                      className="form-control"
                      placeholder="* Ocupación"
                    />
                    {errors.profession && (
                      <p className="errorMsg">{errors.profession.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("companyName", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="companyName"
                      type="text"
                      className="form-control"
                      placeholder="* Nombre Empresa"
                    />
                    {errors.companyName && (
                      <p className="errorMsg">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("companyAddress", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="companyAddress"
                      type="text"
                      className="form-control"
                      placeholder="* Dirección Empresa"
                    />
                    {errors.companyAddress && (
                      <p className="errorMsg">
                        {errors.companyAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("companyPhone", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 7,
                          message: "Mínimo siete caracteres",
                        },
                      })}
                      name="companyPhone"
                      type="text"
                      className="form-control"
                      placeholder="* Telefomo Empresa"
                    />
                    {errors.companyPhone && (
                      <p className="errorMsg">{errors.companyPhone.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("facebookUser", {
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="facebookUser"
                      type="text"
                      className="form-control"
                      placeholder="Usuario Facebook"
                    />
                    {errors.facebookUser && (
                      <p className="errorMsg">{errors.facebookUser.message}</p>
                    )}
                  </div>

                  <div className="col-auto m-1">
                    <input
                      {...register("instagramUser", {
                        minLength: {
                          value: 4,
                          message: "Mínimo cuatro caracteres",
                        },
                      })}
                      name="instagramUser"
                      type="text"
                      className="form-control"
                      placeholder="Usuario Instagram"
                    />
                    {errors.instagramUser && (
                      <p className="errorMsg">{errors.instagramUser.message}</p>
                    )}
                  </div>

                  <div className="row d-flex justify-content-center">
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
        <CandidatesTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default CandidatesModule;
