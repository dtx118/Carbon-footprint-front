import axios from 'axios';

// 👇 TAPE 'ipconfig' DANS TON TERMINAL ET METS TON IPV4 ICI (ex: 192.168.1.15)
// Ne laisse surtout pas 'localhost' si tu testes sur ton téléphone !
const API_URL = 'http://192.168.56.1:8081/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Annule la requête si ça prend plus de 10 secondes
});

export default api;