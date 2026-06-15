import api from "./axios";

const getProducts = () => {
  return api.get("/products");
};

const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

const getCategories=()=>{
return api.get("/category")
}

const getCategoryProducts=(id)=>{
  return api.get(`/category/${id}`)
}

export { getProducts, getProduct, getCategories, getCategoryProducts };
