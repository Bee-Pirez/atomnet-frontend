// services/formSubmissionService.ts
"use client";
import api from "./api";

const formSubmissionService = {
  checkSubmission: async (userId: number, formId: number) => {
    try {
      const response = await api.get(`/submissions/${userId}/${formId}`);
      return response.data;
    } catch (error: any) { 
      if (error.response && error.response.status === 404) {
        return null; 
      } else {
        console.error('Erro ao verificar envio de formulário:', error);
        throw error;
      }
    }
  },

  createFormSubmission: async (formData: any) => {
    try {
      const response = await api.post("/submissions", formData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar formulário enviado:", error);
      throw error;
    }
  },
};

export default formSubmissionService;
