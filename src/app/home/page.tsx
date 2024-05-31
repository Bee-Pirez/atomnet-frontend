"use client";
/// No arquivo UserPage.tsx

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import userService from "../services/userServices";
import formService from "../services/formServices"; 
// import HeaderAuth from "@/components/common/headerAuth";
import Footer from "@/components/common/footer";
// import QuizCard from "@/components/homeAuth/quizCard";
// import FooterAuth from "@/components/homeAuth/footerAuth";

const UserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [forms, setForms] = useState<any[]>([]);

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
        const userData = await userService.fetchCurrent(); // Use userService.fetchCurrent() para buscar os dados do usuário
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Dados do usuário não encontrados.</p>;
  }

  return (
    <main>
      {/* <HeaderAuth></HeaderAuth> */}
      <div className="containerContent">
        <h1 className="title1">Olá empresa {user.corporateName}</h1>
        <p className="paragraph">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industrys standard dummy text ever.
        </p>
      </div>
      <section className="containerCards">
        {forms.map((form) => (
          <div className="card" key={form.id}>
            <h2>{form.formName}</h2>
          </div>
        ))}
      </section>
    </main>
  );
};

export default UserPage;