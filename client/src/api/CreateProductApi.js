import api from "../api/axios.js"

const createProduct=async (formData)=>{
const response = await api.post("/products", formData);

  return response.data;
}

export default createProduct