"use client";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cnpj } from "cpf-cnpj-validator";
import Link from "next/link";
import authService from "../../services/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

// Função para remover caracteres não numéricos do CNPJ
const normalizeCNPJ = (value: string) => value.replace(/\D/g, "");

const schemaSignUp = z.object({
  corporateName: z
    .string()
    .min(4, { message: "Razão Social deve conter no mínimo 4 caracteres" }),
  cnpj: z
    .string()
    .min(14, { message: "CNPJ deve conter no mínimo 14 caracteres" })
    .refine((value) => cnpj.isValid(value), { message: "CNPJ inválido" }),
  postalCode: z
    .string()
    .min(8, { message: "CEP deve conter no mínimo 8 caracteres" }),
  city: z.string().min(1, { message: "Por favor, informe a cidade" }),
  state: z.string().min(1, { message: "Por favor, informe o estado" }),
  street: z.string().min(1, { message: "Por favor, informe a rua" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" })
    .max(20, { message: "Senha deve conter no máximo 20 caracteres" }),
});

type FormValues = z.infer<typeof schemaSignUp>;

function Register() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaSignUp),
  });

  const handleCnpjInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");
    event.target.value = value;
  };

  async function handleOnSubmit(data: FormValues) {
    try {
      await authService.register(data);
      // return toast.success('Cadastrado com sucesso!');
      router.push("/auth/login?registred=true");
    } catch (error: any) {
      console.log("Erro ao conectar db", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return toast.warn(error.response.data.message);
      } else {
        return toast.warn("Ocorreu um erro ao processar sua solicitação.");
      }
    }
  }

  return (
    <>
      <Head>
        <title>AtomNet - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        {/* <script src="https://jsuites.net/v4/jsuites.js"></script> */}
      </Head>
      <main className="main">
        <section className="mainContent">
          <section>
            <Link href="/" className="link">
              <img
                src="/logoWhite.svg"
                alt="logoAtomTechnology"
                className="imgLogo"
              />
            </Link>
            <p>Entre ou crie uma conta</p>
          </section>
          <div className="container">
            <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="formTitle">
                <Link href="/" className="link">
                <img
                  src="/logoIconColorful.svg"
                  alt="logoAtomTechnology"
                  className="imgLogoForm"
                />
                </Link>

                <h2 className="title2">
                  <strong>Faça a sua conta!</strong>
                </h2>
                <p className="paragraph">
                  Já tem conta?<Link href="/auth/login">Entrar</Link>
                </p>
              </div>
              <div className="forContent">
                <div className="inputGroup">
                  <label htmlFor="corporateName" className="label">
                    Razão Social
                  </label>
                  <input
                    id="corporateName"
                    {...register("corporateName")}
                    type="text"
                    placeholder="Empresa Ltda."
                    className="input"
                  />
                  {errors.corporateName && (
                    <p className="error">{errors.corporateName.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="cnpj" className="label">
                    CNPJ
                  </label>
                  <input
                    id="cnpj"
                    {...register("cnpj", {
                      // Função para remover caracteres não numéricos do CNPJ
                      setValueAs: (value) => normalizeCNPJ(value),
                    })}
                    type="text"
                    placeholder="xxxxxxxxxxxxxx"
                    maxLength={14}
                    className="input"
                    onChange={handleCnpjInputChange}
                  />
                  {errors.cnpj && (
                    <p className="error">{errors.cnpj.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="postalCode" className="label">
                    CEP:
                  </label>
                  <input
                    id="postalCode"
                    {...register("postalCode")}
                    type="text"
                    placeholder="xxxxx-xxx"
                    className="input"
                  />
                  {errors.postalCode && (
                    <p className="error">{errors.postalCode.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="city" className="label">
                    Cidade:
                  </label>
                  <input
                    id="city"
                    {...register("city")}
                    type="text"
                    placeholder="Cidade"
                    className="input"
                  />
                  {errors.city && (
                    <p className="error">{errors.city.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="state" className="label">
                    Estado:
                  </label>
                  <input
                    id="state"
                    {...register("state")}
                    type="text"
                    placeholder="Estado"
                    className="input"
                  />
                  {errors.state && (
                    <p className="error">{errors.state.message}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="street" className="label">
                    Rua:
                  </label>
                  <input
                    id="street"
                    {...register("street")}
                    type="text"
                    placeholder="Rua"
                    className="input"
                  />
                  {errors.street && (
                    <p className="error">{errors.street.message}</p>
                  )}
                </div>
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
                <button
                  type="submit"
                  onClick={handleSubmit(handleOnSubmit)}
                  className="button"
                >
                  CADASTRAR
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;