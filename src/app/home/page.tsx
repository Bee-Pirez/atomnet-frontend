"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import userService from "../services/userServices";
import formService from "../services/formServices";
import Footer from "@/components/common/footer";
import HeaderAuth from "@/components/homeAuth/headerAuth";
import QuizCard from "@/components/homeAuth/quizCard";
import formSubmissionService from "../services/formSubmissionService";
import authService from "@/app/services/authService";

const UserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [forms, setForms] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(null); // Estado para armazenar os dados do formulário sendo respondido

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
    const fetchFormsData = async () => {
      try {
        const formsData = await formService.listForms();
        setForms(formsData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar formulários:", error);
        setLoading(false);
      }
    };

    fetchFormsData();
  }, []);

  const handleLogout = async () => {
    authService.logout();
    router.push("/auth/login");
  };

  // Função para lidar com o envio do formulário
  const handleSubmitForm = async () => {
    try {
      if (formData) {
        await formSubmissionService.createFormSubmission(formData);
        // Redirecionar para uma página de sucesso ou exibir uma mensagem de sucesso
        router.push("/success");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Dados do usuário não encontrados.</p>;
  }

  return (
    <main>
      <HeaderAuth onLogout={handleLogout} />
      <div className="w-full xl:w-3/4 containerContent lg:py-32 md:py-20 pt-24 pb-16 px-4 sm:px-16 md:px-32 lg:px-50 py-8 flex flex-col ">
        <h1 className="text-h1-sm sm:text-h1-sm xl:text-h1-lg md:text-h1-md">
          Olá empresa <strong>{user.corporateName}</strong>
        </h1>
        <p className="mt-2 text-p-sm xl:text-p-lg sm:text-p-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industrys standard dummy text ever.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industrys standard dummy text ever.
        </p>
      </div>
      <section className="containerCards flex flex-wrap justify-between gap-8 px-4 sm:px-16 md:px-32 lg:px-50 flex justify-between items-center py-8">
        {forms.map((form) => (
          <QuizCard
            key={form.id}
            title={form.formName}
            imageUrl={"/imgForms.svg"}
          >
            <Link href={`/form/${form.id}`}>
              <Button
                onClick={handleSubmitForm}
                color="primary"
                variant="bordered"
                className="px-4 py-2 lg:px-8 md:px-6 sm:px-4 border-2 border-normalLigthBlue rounded-sm text-white"
              >
                <p className="text-p-sm xl:text-p-lg sm:text-p-sm">
                  Responder Questionário {form.formName}
                </p>
              </Button>
            </Link>
          </QuizCard>
        ))}
      </section>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer></Footer>
      </div>
    </main>
  );
};

export default UserPage;
