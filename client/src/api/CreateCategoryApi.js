import api from "./axios";

 const createCategory = async (formData) => {
  const response = await api.post("/category", formData);

  return response.data;
};

export default createCategory