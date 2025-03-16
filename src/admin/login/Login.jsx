import { useForm } from "react-hook-form";
import axios from "axios";
import "./login.css";

const baseUrl = "http://localhost:3333";
const customersUrl = `${baseUrl}/auth/signin`;

const Login = () => {
  // const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(customersUrl, data);
      console.log("response.data", response.data)
      if (response.data.access_token) {
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        console.log("Token saved to local storage", token);
        window.location.href = "/modulo/usuarios";
      } else {
        alert("Usuario o contraseña incorrectos")
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
    reset();
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={require("../../assets/fundapet_heart.png")} alt="logo" />
        </div>
        <div className="text-center mt-4 name">Fundapet</div>
        <form className="p-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
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
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 7,
                  message: "Mínimo siete caracteres",
                },
              })}
              name="password"
              type="password"
              className="form-control"
              placeholder="* Contraseña"
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </div>
          <button className="btn mt-3" type="submit">
            Ingresar
          </button>
        </form>
      </div>
      <p>
        ¿Olvidaste tu contraseña?
        <a href="/resetPassword">Recupérala aquí</a>
      </p>
    </>
  );
};

export default Login;
