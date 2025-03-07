import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { api } from "../api";
import { FaPlusSquare } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import { dniTypeOptions } from "../candidatesModule/options";
import { Loader } from "../../admin";
import SupportersTable from "./SupportersTable";
import { supporterOptions } from "./options";
import "./supportersModule.css";

const customersUrl = "/supporters";

const SupportersModule = () => {
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
      cellphone: "",
      email: "",
      supportAlternatives: "",
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
      firstName: "",
      lastName: "",
      dniType: "",
      dniNumber: "",
      cellphone: "",
      email: "",
      supportAlternatives: "",
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
                firstName: formData.firstName,
                lastName: formData.lastName,
                dniType: formData.dniType,
                dniNumber: formData.dniNumber,
                cellphone: formData.cellphone,
                email: formData.email,
                supportAlternatives: formData.supportAlternatives,
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
        <h3 className="mt-5 text-center">Módulo Colaboradores</h3>
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
                    <select
                      {...register("supportAlternatives", {
                        required: "Este campo es requerido",
                      })}
                      className="w-100 form-select"
                      name="supportAlternatives"
                      type="text"
                    >
                      <optgroup>
                        {supporterOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.supportAlternatives && (
                      <p className="errorMsg">
                        {errors.supportAlternatives.message}
                      </p>
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
        <SupportersTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default SupportersModule;
