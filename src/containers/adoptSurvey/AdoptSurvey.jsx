import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import {
  houseTypeOptions,
  timeAloneOptions,
  anyKidsOptions,
  reasonsOptions,
  hadPetOptions,
  havePetOptions,
} from "../../admin/surveysModule/options";
import "./adoptSurvey.css";
import axios from "axios";
import "./adoptSurvey.css";

const baseUrl = "http://localhost:3333";
const customersUrl = `${baseUrl}/survey-fields`;

function AdoptSurvey() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      dniNumber: "",
      familyComposition: "",
      adultsQty: "",
      childrenQty: "",
      babiesQty: "",
      houseType: "",
      timeAlone: "",
      anyKids: "",
      childrenAges: "",
      reasons: "",
      reasonsOther: "",
      hadPet: "",
      hadPetOther: "",
      havePet: "",
      havePetOther: "",
      getFundapetInfo: "",
      adoptReason: "",
      ref1Name: "",
      ref1Cellphone: "",
      ref2Name: "",
      ref2Cellphone: "",
    },
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(customersUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleReset = () => {
    reset({
      dniNumber: "",
      familyComposition: "",
      adultsQty: "",
      childrenQty: "",
      babiesQty: "",
      houseType: "",
      timeAlone: "",
      anyKids: "",
      childrenAges: "",
      reasons: "",
      reasonsOther: "",
      hadPet: "",
      hadPetOther: "",
      havePet: "",
      havePetOther: "",
      getFundapetInfo: "",
      adoptReason: "",
      ref1Name: "",
      ref1Cellphone: "",
      ref2Name: "",
      ref2Cellphone: "",
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
        alert("Registro exitoso");
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
      <div className="section__main_container">
        <div className="section_main">
          <h2>Encuesta</h2>
          <p>
            Las preguntas que realizamos a continuación tienen como objetivo
            principal, el proporcionarnos información sobre el deseo de adoptar
            un gato/perro, la historia del solicitante con otros animales y las
            condiciones de vida que se le brindarían al gato/perro, en caso de
            ser entregado en adopción.
          </p>
          <p>
            Muchos de nuestros animales han sufrido en el transcurso de sus
            vidas. Por lo tanto, procuramos encontrar para cada uno de ellos el
            hogar ideal que se ajuste a sus necesidades comportamentales y donde
            sean tratados con <strong>AMOR, RESPETO Y PROTECCIÓN</strong> por el
            resto de sus vidas.
          </p>
          <p>
            Le agradecemos responder cada una de las preguntas con la mayor
            honestidad y claridad posible… <strong>MUCHAS GRACIAS!!!</strong>
          </p>
          <div className="col-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Número de documento:</label>
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
                      placeholder="* Ej: 80156897"
                    />
                    {errors.dniNumber && (
                      <p className="errorMsg">{errors.dniNumber.message}</p>
                    )}
                  </div>

                  <div className="col">
                    <label>Composición del hogar:</label>
                    <input
                      {...register("familyComposition", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 4,
                          message: "Cuatro caracteres mínimo",
                        },
                      })}
                      name="familyComposition"
                      type="text"
                      className="form-control"
                      placeholder="* Ej: Papá 40 años, mamá 36 años..."
                    />
                    {errors.familyComposition && (
                      <p className="errorMsg">
                        {errors.familyComposition.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">
                  Número de personas en la familia que vivirán con la mascota:
                </label>
                <div className="row">
                  <div className="col">
                    <input
                      {...register("adultsQty", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 1,
                          message: "Un caracter mínimo",
                        },
                        valueAsNumber: true,
                      })}
                      name="adultsQty"
                      type="number"
                      className="form-control"
                      placeholder="* Adultos"
                    />
                    {errors.adultsQty && (
                      <p className="errorMsg">{errors.adultsQty.message}</p>
                    )}
                  </div>

                  <div className="col">
                    <input
                      {...register("childrenQty", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 1,
                          message: "Un caracter mínimo",
                        },
                        valueAsNumber: true,
                      })}
                      name="childrenQty"
                      type="number"
                      className="form-control"
                      placeholder="* Niños"
                    />
                    {errors.childrenQty && (
                      <p className="errorMsg">{errors.childrenQty.message}</p>
                    )}
                  </div>

                  <div className="col">
                    <input
                      {...register("babiesQty", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 1,
                          message: "Un caracter mínimo",
                        },
                        valueAsNumber: true,
                      })}
                      name="babiesQty"
                      type="number"
                      className="form-control"
                      placeholder="* Bebés"
                    />
                    {errors.babiesQty && (
                      <p className="errorMsg">{errors.babiesQty.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="pt-3">Preguntas</h2>
              <ol>
                  <div className="col">
                    <li className="list__item">Qué tipo de vivienda tienes?</li>
                    <div className="form-group question__input">
                      <select
                        name="houseType"
                        className="form-select"
                        {...register("houseType", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {houseTypeOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.houseType && (
                        <p className="errorMsg">{errors.houseType.message}</p>
                      )}
                      <small className="text__wrap">
                        En caso de vivir en apartamento o casa arrendada, por
                        favor revisa tu régimen o contrato en cuanto a la
                        tenencia de mascotas
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <li className="list__item">
                      ¿Por cuánto tiempo dejarás solo a tu gato/perro al día?
                    </li>
                    <div className="form-group question__input">
                      <select
                        name="timeAlone"
                        className="form-select"
                        {...register("timeAlone", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {timeAloneOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.timeAlone && (
                        <p className="errorMsg">{errors.timeAlone.message}</p>
                      )}
                    </div>
                  </div>



                  <div className="col">
                    <li className="list__item">
                      ¿Hay niños pequeños en la casa que habitarán el
                      gato/perro?
                    </li>
                    <div className="form-group question__input">
                      <select
                        name="anyKids"
                        className="form-select"
                        {...register("anyKids", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {anyKidsOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.anyKids && (
                        <p className="errorMsg">{errors.anyKids.message}</p>
                      )}
                      <small className="text__wrap">Especificar edades</small>
                      <input
                        {...register("childrenAges")}
                        name="childrenAges"
                        type="text"
                        className="form-control"
                        placeholder="ej: 8, 12, 16"
                      />
                      {errors.childrenAges && (
                        <p className="errorMsg">
                          {errors.childrenAges.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <li className="list__item">
                      ¿Para qué quieres adoptar un gato/perro?
                    </li>
                    <div className="form-group question__input">
                      <select
                        name="reasons"
                        className="form-select"
                        {...register("reasons", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {reasonsOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.reasons && (
                        <p className="errorMsg">{errors.reasons.message}</p>
                      )}
                      <small className="text__wrap">
                        Especificar otra razón
                      </small>
                      <input
                        {...register("reasonsOther")}
                        name="reasonsOther"
                        type="text"
                        className="form-control"
                      />
                      {errors.reasonsOther && (
                        <p className="errorMsg">
                          {errors.reasonsOther.message}
                        </p>
                      )}
                    </div>
                  </div>



                  <div className="col">
                    <li className="list__item">
                      ¿Has tenido gato/perro antes?
                    </li>
                    <div className="form-group question__input">
                      <select
                        name="hadPet"
                        className="form-select"
                        {...register("hadPet", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {hadPetOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.hadPet && (
                        <p className="errorMsg">{errors.hadPet.message}</p>
                      )}
                      <small className="text__wrap">
                        En caso afirmativo especifique cuál era y la razón por
                        la que ya no la tiene en casa
                      </small>
                      <input
                        {...register("hadPetOther")}
                        name="hadPetOther"
                        type="text"
                        className="form-control"
                      />
                      {errors.hadPetOther && (
                        <p className="errorMsg">{errors.hadPetOther.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <li className="list__item">
                      ¿Tienes gato/perro actualmente?
                    </li>
                    <div className="form-group question__input">
                      <select
                        name="havePet"
                        className="form-select"
                        {...register("havePet", {
                          required: "Este campo es requerido",
                        })}
                      >
                        <optgroup>
                          {havePetOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.havePet && (
                        <p className="errorMsg">{errors.havePet.message}</p>
                      )}
                      <small className="text__wrap">
                        En caso afirmativo, especifique tamaño, temperamento y
                        edad aproximada.
                      </small>
                      <input
                        {...register("havePetOther")}
                        name="havePetOther"
                        type="text"
                        className="form-control"
                      />
                      {errors.havePetOther && (
                        <p className="errorMsg">
                          {errors.havePetOther.message}
                        </p>
                      )}
                    </div>
                  </div>

              </ol>

              <p>
                <strong>
                  Recuerda que el gato/perro requiere de un hogar seguro,
                  atención veterinaria regular, alimento adecuado, agua limpia,
                  etc. La calle sólo le significa enfermedad, accidentes,
                  hambre, muerte
                </strong>
              </p>

                <div className="col">
                  <p>
                    ¿Cómo te enteraste de la adopción del gato/perro que
                    solicitas?
                  </p>
                  <textarea
                    {...register("getFundapetInfo", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 4,
                        message: "Cuatro caracteres mínimo",
                      },
                    })}
                    name="getFundapetInfo"
                    type="text"
                    className="form-control question__input"
                  />
                  {errors.getFundapetInfo && (
                    <p className="errorMsg">{errors.getFundapetInfo.message}</p>
                  )}
                </div>

                <div className="col">
                  <p>
                    ¿Por qué quieres adoptar a este gato/perro? ¿Por qué crees
                    que eres la persona adecuada para darle un hogar?
                  </p>
                  <textarea
                    {...register("adoptReason", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 4,
                        message: "Cuatro caracteres mínimo",
                      },
                    })}
                    name="adoptReason"
                    type="text"
                    className="form-control question__input"
                  />
                  {errors.adoptReason && (
                    <p className="errorMsg">{errors.adoptReason.message}</p>
                  )}
                </div>


              <h2 className="pt-3">Referencias</h2>
              <p>Por favor proporcione dos referencias</p>

                <div className="col">
                  <h5>Referencia 1</h5>
                  <div className="form__group_container">
                    <div className="form-group">
                      <input
                        {...register("ref1Name", {
                          required: "Este campo es requerido",
                          minLength: {
                            value: 4,
                            message: "Cuatro caracteres mínimo",
                          },
                        })}
                        name="ref1Name"
                        type="text"
                        className="form-control question__input"
                        placeholder="* Nombre Completo"
                      />
                      {errors.ref1Name && (
                        <p className="errorMsg">{errors.ref1Name.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form__group_container">
                    <div className="form-group">
                      <input
                        {...register("ref1Cellphone", {
                          required: "Este campo es requerido",
                          minLength: {
                            value: 4,
                            message: "Cuatro caracteres mínimo",
                          },
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: "Ingresar únicamente números",
                          },
                        })}
                        name="ref1Cellphone"
                        type="text"
                        className="form-control question__input"
                        placeholder="* Teléfono"
                      />
                      {errors.ref1Cellphone && (
                        <p className="errorMsg">
                          {errors.ref1Cellphone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col">
                  <h5>Referencia 2</h5>
                  <div className="form__group_container">
                    <div className="form-group">
                      <input
                        {...register("ref2Name", {
                          required: "Este campo es requerido",
                          minLength: {
                            value: 4,
                            message: "Cuatro caracteres mínimo",
                          },
                        })}
                        name="ref2Name"
                        type="text"
                        className="form-control question__input"
                        placeholder="* Nombre Completo"
                      />
                      {errors.ref2Name && (
                        <p className="errorMsg">{errors.ref2Name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="form__group_container">
                    <div className="form-group">
                      <input
                        {...register("ref2Cellphone", {
                          required: "Este campo es requerido",
                          minLength: {
                            value: 4,
                            message: "Cuatro caracteres mínimo",
                          },
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: "Ingresar únicamente números",
                          },
                        })}
                        name="ref2Cellphone"
                        type="text"
                        className="form-control question__input"
                        placeholder="* Teléfono"
                      />
                      {errors.ref2Cellphone && (
                        <p className="errorMsg">
                          {errors.ref2Cellphone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>


              <h2 className="pt-3">Importante</h2>
              <p>
                Al enviar este formato, acepto que he leído de conformidad los
                requisitos, y declaro que la información proporcionada es
                verdadera. ACEPTO QUE:
              </p>
              <ol>
                <li>El adoptado será un miembro más de su familia.</li>
                <li>
                  El adoptado tendrá en todo momento agua limpia a libre acceso
                </li>
                <li>
                  El adoptado tendrá una alimentación balanceada preferiblemente
                  a base de croqueta seca
                </li>
                <li>
                  El adoptado usará siempre un collar con su placa de
                  identificación.
                </li>
                <li>
                  En el caso de que el adoptado sea perro, siempre se le sacará
                  a pasear con correa, nunca suelto.
                </li>
                <li>
                  El adoptado no será en ningún caso golpeado, maltratado,
                  humillado, <strong>abandonado, ni regalado</strong>
                </li>
                <li>
                  El adoptado debe contar con un área para dormir y comer.
                </li>
                <li>
                  El adoptado recibirá los cuidados médicos necesarios para su
                  bienestar (desparasitación, vacunación y control veterinario)
                </li>
                <li>
                  El animal NO será nuevamente adoptado sin previo
                  consentimiento de la persona encargada de este caso. Se
                  informará previamente.
                </li>
                <li>
                  Cancelar la cuota de adopción, tendrá un costo de $100.000
                  pesos por gato/perro, que puede ser entregados en efectivo o
                  en productos para gatos/perros (comida, arena, medicamentos).
                  Está cuota nos ayuda a hacer adopciones responsables, es una
                  suma simbólica para ayudar en una parte de los gastos en los
                  que se ha incurrido en el proceso de rescate y recuperación
                  del animal (esto incluye concentrado, arena, desparasitación,
                  guardería, esterilización/castración, medicamentos, gastos
                  veterinarios entre otros). Con esta cuota se podrá seguir
                  ayudando a otros animales.
                </li>
                <li>
                  Se debe entregar copia de cédula de ciudadanía en el momento
                  de la entrega y fotocopia de recibos públicos.
                </li>
              </ol>
              <p>
                <strong>
                  El adoptante informara periódicamente el estado del animal,
                  mediante fotos, llamadas telefónicas o correos electrónicos.
                </strong>
              </p>
              <p>
                Una de nuestras principales labores es fomentar la{" "}
                <strong>ESTERILIZACIÓN </strong>
                de perros y gatos, debido a la sobrepoblación que habita en las
                calles
              </p>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-primary" type="submit">
                    Guardar
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
      <Footer />
    </>
  );
}

export default AdoptSurvey;
