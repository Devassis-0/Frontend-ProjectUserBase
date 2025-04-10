import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const listarUsuarios = async () => {
  const res = await axios.get(`${API_URL}/usuarios/`);
  return res.data;
};

export const cadastrarUsuario = async (usuario) => {
  const res = await axios.post(`${API_URL}/usuarios/`, usuario);
  return res.data;
};
