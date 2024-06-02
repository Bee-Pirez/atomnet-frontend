// services/AnswerService.ts
import api from "./api";

const AnswerService = {
  createAnswer: async (answerData: any) => {
    try {
      const response = await api.post("/answers", answerData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      throw error;
    }
  },
};

export default AnswerService;