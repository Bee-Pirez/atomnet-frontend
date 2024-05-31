"use client";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation"; // Adicionado o useRouter

const schemaSignUp = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" })
    .max(20, { message: "Senha deve conter no máximo 20 caracteres" }),
});

type FormValues = z.infer<typeof schemaSignUp>;

const Login = function () {
  const router = useRouter();

  const searchParams = useSearchParams();
  const registred = searchParams.get("registred");
  console.log(searchParams.toString());
  console.log(registred);

  useEffect(() => {
    if (sessionStorage.getItem("atomnet-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if (registred === "true") {
      toast.success("Cadastrado com sucesso!");
    }
  }, [registred]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaSignUp),
  });

  async function handleOnSubmit(data: FormValues) {
    try {
      await authService.login(data);
      router.push("/home");
    } catch (error: any) {
      console.log("Erro ao conectar db", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return toast.warn(error.response.data.message);
      } else {
        return toast.warn("Email ou senha incorretos!");
      }
    }
  }

  return (
    <>
      <Head>
        <title>AtomNet - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className="main">
        <section className="mainContent">
          <section className="flex flex-col gap-4 text-left items-start">
            <Link href="/">
              <img
                src="/logoWhite.svg"
                alt="logoAtomTechnolofy"
                className="imgLogo"
              />
            </Link>
            <p>Entre ou crie uma conta</p>
          </section>
          <div className="container">
            <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="formTitle">
                <Link href="/">
                <img
                  src="/logoIconColorful.svg"
                  alt="logoAtomTechnology"
                  className="imgLogoForm w-20"
                />
                </Link>
                <h2 className="title2">
                  <strong>Bem-vindo(a)!</strong>
                </h2>
                <p className="paragraph">
                  Ainda não tem conta?<Link href="/auth/register">Cadastrar</Link>
                </p>
              </div>
              <div className="forContent">
                <div className="inputGroup">
                  <label htmlFor="email" className="label">
                    E-MAIL
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Digite o seu e-mail"
                    className="input"
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="password" className="label">
                    SENHA
                  </label>
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                    className="input"
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </div>
                {/* Restante dos campos */}
                <button type="submit" className="button">
                  ENTRAR
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;