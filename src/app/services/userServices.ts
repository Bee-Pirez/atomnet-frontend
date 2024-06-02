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
    try {
      const res = await api.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      throw error;
    }
  },

  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("atomnet-token");
    try {
      const res = await api.put("/users", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.status;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  },
};

export default userService;
