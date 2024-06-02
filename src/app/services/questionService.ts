import api from "./api";

interface Question {
  id: number;
  question: string;
  questionCategory?: {
    id: number;
    category: string;
  };
}

const questionService = {
  getAllByFormIdGroupedByCategory: async (formId: number): Promise<{ [category: string]: Question[] }> => {
    try {
      const token = sessionStorage.getItem("atomnet-token");
      const response = await api.get(`/questions/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar perguntas pelo ID do formulário agrupadas por categoria:", error);
      throw error;
    }
  },

  getAllByFormId: async (formId: number): Promise<Question[]> => {
    try {
      const token = sessionStorage.getItem("atomnet-token");
      const response = await api.get(`/questions/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Question[];
    } catch (error) {
      console.error("Erro ao buscar perguntas pelo ID do formulário:", error);
      throw error;
    }
  },
};

export default questionService;

  // findByFormIdGroupedByCategory: async (formId: number): Promise<Question[]> => {
  //   try {
  //     const response = await api.get(`/questions/groupedByCategory/${formId}`);
  //     return response.data as Question[];
  //   } catch (error) {
  //     console.error("Erro ao buscar perguntas agrupadas por categoria:", error);
  //     throw error;
  //   }
  // },
