import api from "./api";

interface FormParams {
  id: number;
  formName: string;
  // Adicione outros campos conforme necessário
}

const formService = {
  listForms: async () => {
    try {
      const res = await api.get("/forms");
      return res.data;
    } catch (error) {
      console.error("Error while fetching forms:", error);
      throw error;
    }
  },
};

export default formService;
