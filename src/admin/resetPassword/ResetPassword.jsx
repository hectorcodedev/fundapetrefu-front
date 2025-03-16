import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/auth/forgot-password", { email });
      alert(response.data.message);
    } catch (error) {
      console.error("Error al enviar el correo", error);
      alert("Error al enviar el correo. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="wrapper">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Código</button>
      </form>
    </div>
  );
};

export default ResetPassword;