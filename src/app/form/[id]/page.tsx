"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import questionService from "../../services/questionService";
import userService from "../../services/userServices";
import authService from "@/app/services/authService";
import formSubmissionService from "@/app/services/formSubmissionService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAuth from "@/components/homeAuth/headerAuth";
import { Tooltip, Button } from "@nextui-org/react";
import Footer from "@/components/common/footer";
import AnswerService from "@/app/services/answerService";

interface Question {
  id: number;
  question: string;
  category: string;
  control: string;
  theme: string;
}

interface SubmissionData {
  created_at: string;
}

const FormQuestionsPage = () => {
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const formId = params.id;
  const [questions, setQuestions] = useState<{ [key: string]: Question[] }>({});
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const questionsPerPage = 10;
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(
    null
  );
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [formSubmissionId, setFormSubmissionId] = useState<number | null>(null);


  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem("atomnet-token");
      if (!token) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  const handleLogout = async () => {
    authService.logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    const checkAnswersConsistency = () => {
      const savedAnswers = JSON.parse(
        localStorage.getItem(`form_${formId}_answers`) || "{}"
      );
      console.log(savedAnswers);

      const numQuestions = Object.keys(questions).reduce(
        (acc, category) => acc + questions[category].length,
        0
      );
      const numAnswers = Object.keys(savedAnswers).length;

      console.log("Quantidade de perguntas:", numQuestions);
      console.log("Quantidade de respostas:", numAnswers);

      if (numQuestions !== numAnswers) {
        console.error("Por favor, responda todas as perguntas");
      }
    };

    checkAnswersConsistency();
  }, [formId, questions]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.fetchCurrent();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (formId) {
          const fetchedQuestions =
            await questionService.getAllByFormIdGroupedByCategory(formId);
          setQuestions(fetchedQuestions);
          setLoading(false);

          // Load answers from localStorage
          const savedAnswers = JSON.parse(
            localStorage.getItem(`form_${formId}_answers`) || "{}"
          );
          setAnswers(savedAnswers);
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [formId]);

  useEffect(() => {
    const checkFormSubmission = async () => {
      try {
        if (user && formId) {
          const submission = await formSubmissionService.checkSubmission(
            user.id,
            formId
          );
          if (submission) {
            setFormSubmitted(true);
            setSubmissionData(submission);
            setFormSubmissionId(submission.id);
            console.log("Detalhes da submissão:", submission);
          } else {
            setFormSubmitted(false);
          }
        }
      } catch (error) {
        console.error(
          "Erro ao verificar se o formulário já foi enviado:",
          error
        );
      }
    };

    checkFormSubmission();
  }, [user, formId]);

  const handleFormNotFound = () => {
    toast.error("Formulário não encontrado");
  };

  if (!formId) {
    handleFormNotFound();
    return <p>Formulário não encontrado.</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (formSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-normalIndigo to-normalPurple ">
        <HeaderAuth onLogout={handleLogout} />
        <button onClick={handleLogout}>SAIR</button>
        <div className="lg:pt-24 lg:pb-16 pt-24 pb-16 px-4 sm:px-16 md:px-32 lg:px-50 py-8">
          <h1 className="text-h1-sm sm:text-h1-sm xl:text-h1-lg md:text-h1-md">
            Você já finalizou seu formulário
          </h1>
          <p>
            Confira detalhadamente os resultados obtidos na avaliação de
            maturidade em segurança da sua organização
          </p>
        </div>
        <div className="containerContent lg:py-2 md:py-2 pt-2 pb-2 px-4 sm:px-16 md:px-32 lg:px-50 flex flex-col py-8">
          <div className="flex flex-col bg-normalViolet shadow-lg rounded-lg p-8">
            <div>
              <h2 className="text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
                Formulário enviado com sucesso
              </h2>
              <p className="text-lg text-normalGray mb-6">
                Data de envio: {submissionData?.created_at}
              </p>
              <button
                onClick={() => router.back()}
                className="text-white font-semibold rounded-md hover:text-gray-300 transition duration-300"
              >
                Voltar
              </button>
            </div>
            <div>
              <button
                color="primary"
                className="w-50 mt-12 px-4 py-2 lg:px-8 md:px-6 sm:px-4 border-2 border-normalLigthBlue rounded-sm text-white"
              >
                <p className="text-p-sm xl:text-p-lg sm:text-p-sm">
                  Visualizar relatório
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <Footer></Footer>
        </div>
      </main>
    );
  }

  const categories = Object.keys(questions);
  const totalPages = Math.ceil(categories.length / questionsPerPage);
  const startIndex = currentStep * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, categories.length);
  const currentCategories =
    currentStep < totalPages - 1
      ? categories.slice(startIndex, endIndex)
      : categories.slice(startIndex);

  const renderQuestionsForStep = (category: string) => {
    return questions[category].map((question) => (
      <div key={question.id} className="mb-4">
        <p className="mb-2 mt-16 text-p-sm xl:text-p-lg sm:text-p-sm">
          {question.question}
        </p>
        <div className="flex gap-4 items-center mt-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name={`question_${question.id}`}
              value="Sim"
              className="form-radio h-5 w-5 text-gray-600"
              checked={answers[question.id] === "Sim"}
              onChange={() => handleAnswerChange(question.id, "Sim")}
              required // Campo obrigatório
            />
            <span className="ml-2">Sim</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name={`question_${question.id}`}
              value="Não"
              className="form-radio h-5 w-5 text-gray-600"
              checked={answers[question.id] === "Não"}
              onChange={() => handleAnswerChange(question.id, "Não")}
              required // Campo obrigatório
            />
            <span className="ml-2">Não</span>
          </label>
        </div>
      </div>
    ));
  };

  const handleNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, totalPages - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [questionId]: answer };
      localStorage.setItem(
        `form_${formId}_answers`,
        JSON.stringify(newAnswers)
      );

      return newAnswers;
    });
  };

  const handleFormSubmit = async () => {
    try {
      const savedAnswers = JSON.parse(
        localStorage.getItem(`form_${formId}_answers`) || "{}"
      );

      const numQuestions = Object.keys(questions).reduce(
        (acc, category) => acc + questions[category].length,
        0
      );
      const numAnswers = Object.keys(savedAnswers).length;

      console.log("Quantidade de perguntas:", numQuestions);
      console.log("Quantidade de respostas:", numAnswers);

      if (numQuestions !== numAnswers) {
        console.error("A quantidade de perguntas e respostas não é a mesma.");
        toast.error(
          "Por favor, responda todas as perguntas antes de enviar o formulário."
        );
        return;
      }

      const allAnswersValid = Object.values(savedAnswers).every(
        (answer) => answer === "Sim" || answer === "Não"
      );

      if (!allAnswersValid) {
        toast.error(
          "Por favor, responda todas as perguntas antes de enviar o formulário."
        );
        return;
      }

      console.log("Formulário enviado com sucesso!");

      const answersToSubmit = { ...savedAnswers };

      localStorage.removeItem(`form_${formId}_answers`);
      setAnswers({});
      setFormSubmitted(true);
      
      const formData = {
        userId: user.id,
        formId: formId,
      };

      const submissionData = await formSubmissionService.createFormSubmission(
        formData
      );

      setFormSubmissionId(submissionData.id);

      for (const [questionId, answer] of Object.entries(answersToSubmit)) {
        const answerData = {
          is_applicable: answer === "Sim" ? 1 : 0,
          form_submission_id: formSubmissionId,
          question_id: parseInt(questionId),
        };

        console.log("form_submission_id:", answerData.form_submission_id);

        try {
          await AnswerService.createAnswer(answerData);
        } catch (error) {
          console.error("Erro ao criar resposta:", error);
        }
      }

      toast.success("Respostas enviadas com sucesso!");

    } catch (error) {
      toast.error("Erro ao enviar formulário. Tente novamente.");
      console.error("Erro ao enviar formulário:", error);
    }
  };

  const numQuestions = Object.keys(questions).reduce(
    (acc, category) => acc + questions[category].length,
    0
  );

  return (
    <main>
      <HeaderAuth onLogout={handleLogout} />

      <div className="containerContent lg:py-32 md:py-20 pt-24 pb-16 px-4 sm:px-16 md:px-32 lg:px-50 flex flex-col py-8">
        <h1 className="text-h1-sm sm:text-h1-sm xl:text-h1-lg md:text-h1-md">
          Perguntas do Formulário
        </h1>
        {currentCategories.map((category) => (
          <div
            key={category}
            className="mb-8 bg-normalViolet to-transparent p-4 rounded-lg"
          >
            <h2 className="text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
              {category}
            </h2>

            {renderQuestionsForStep(category)}
          </div>
        ))}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={handlePrevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Voltar
            </button>
          )}
          {currentStep < totalPages - 1 ? (
            <button
              onClick={handleNextStep}
              className="bg-normalBlue hover:bg-hoverBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleFormSubmit}
              className={`${
                Object.keys(answers).length === numQuestions &&
                Object.values(answers).every(
                  (answer) => answer === "Sim" || answer === "Não"
                )
                  ? "bg-green-500 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              disabled={
                !(
                  Object.keys(answers).length === numQuestions &&
                  Object.values(answers).every(
                    (answer) => answer === "Sim" || answer === "Não"
                  )
                )
              }
            >
              Enviar
            </button>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default FormQuestionsPage;

// // pages/forms/[formId].tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "next/navigation";
// import questionService from "../../services/questionService";

// interface Question {
//   id: number;
//   question: string;
// }

// const FormQuestionsPage = () => {
//   const params = useParams();
//   const formId = params.id;
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         if (formId) {
//           const questionsData = await questionService.getAllByFormId(parseInt(formId));
//           setQuestions(questionsData);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar perguntas:", error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [formId]);

//   if (!formId) {
//     return <p>Formulário não encontrado.</p>;
//   }

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <div>
//       <h1>Perguntas do Formulário</h1>
//       <p className="text-gray-900">ID do Formulário: {formId}</p>
//       <ul>
//         {questions.map((question) => (
//           <li className="text-white" key={question.id}>{question.question}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FormQuestionsPage;
