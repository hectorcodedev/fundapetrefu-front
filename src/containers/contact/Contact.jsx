import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import "./contact.css";
import { dniTypeOptions } from "../../admin/candidatesModule/options";
import { supporterOptions } from "../../admin/supportersModule/options";

const baseUrl = "http://localhost:3333";
const customersUrl = `${baseUrl}/supporters`;

const Contact = () => {
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
  const navigate = useNavigate();

  const handleReset = () => {
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
      const response = await axios.post(customersUrl, newItem);
      if (response.status === 201) {
        newItem = response.data;
        setData([...data, newItem]);
        alert("Gracias por tu ayuda");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="contact__main_container">
        <div className="form-container">
          <div className="row">
            <div className="d-flex justify-content-center">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="title__container">
                  <h1>Ayúdanos a Ayudar</h1>
                </div>
                <div className="col-2 m-1">
                  <input type="hidden" {...register("id")} />
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                  <div className="col-auto m-2">
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

                  <div className="col-auto m-2">
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

                  <div className="col-auto m-2">
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

                  <div className="col-auto m-2">
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

                  <div className="col-auto m-2">
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
                  <div className="col-auto m-2">
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

                  <div className="col-auto m-2">
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

                <div className="row d-flex justify-content-center">
                  <div className="col-auto m-2">
                    <button className="btn btn-primary" type="submit">
                      Enviar
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
