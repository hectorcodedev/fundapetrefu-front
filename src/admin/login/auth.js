import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'http://localhost:3333', 
});

export const sendRecoveryEmail = async (email) => {
  try {
    const response = await apiAuth.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
  }
};
