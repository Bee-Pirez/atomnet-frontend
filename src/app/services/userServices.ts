import api from "./api";

interface UserParams {
  corporateName: string;
  cnpj: string;
  postalCode: string;
  city: string;
  state: string;
  street: string;
  email: string;
  created_at: string;
}

const userService = {
  fetchCurrent: async () => {
    const token = sessionStorage.getItem("atomnet-token");
  
    const res = await api.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log(error.response.data.message);
  
      return error.response;
    });
  
    return res.data;
  },


  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("atomnet-token");
  
    const res = await api
    .put("/users", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    })
    .catch((error) => {
    if (error.response.status === 400 || error.response.status === 401) {
      return error.response;
    }
  
    return error;
    });
  
    return res.status;
  },

};

export default userService;