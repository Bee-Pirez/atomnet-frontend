import api from "./api";
// import { setCookie, parseCookies } from 'nookies'

interface RegisterParams {
  corporateName: string;
  cnpj: string;
  postalCode: string;
  city: string;
  state: string;
  street: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
    if (error.response.status === 400 || error.response.status === 401) {
      return error.response;
    }
    return error;
    });
  
    if (res.status === 200) {
      sessionStorage.setItem("atomnet-token", res.data.token);
    }

    return res;
  },

  getUserData: async () => {
    try {
      const token = sessionStorage.getItem("atomnet-token");
      if (!token) {
        throw new Error("Token JWT não encontrado");
      }
      
      // Enviar o token JWT no cabeçalho de autorização
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; 
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      throw error;
    }
  },
};



export default authService;