"use client";

import Footer from "@/app/components/footer";
import NavbarL from "@/app/components/navbarl";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formdata.get("email"),
        password: formdata.get("password"),
        fullname: formdata.get("fullname"),
      });
      console.log(signupResponse);

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formdata.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/pages/profile");

      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <body>
      <NavbarL/>
      <div
        className="justify-center h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-white-400 to-secundary-400"
        style={{
          backgroundImage: 'url("/img/fondo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white-500 bg-opacity-80 px-14 py-10 md:w-3/12 shadow-2xl rounded-3xl"
        >
          {error && (
            <div className="bg-red-600 text-white p-2 mb-2">{error}</div>
          )}

          <h1 className="font-serif text-neutral-900 text-center text-3xl md:text-4xl select-none mb-4">
            MediWiki
          </h1>

          <div className="flex justify-center items-center mb-4">
            <Image
              src="/img/logon.png"
              width={616 / 5}
              height={627 / 5}
              alt=""
            />
          </div>

          <label
            htmlFor="fullname"
            className="font-serif text-neutral-900 select-none mb-1 block"
          >
            Nombre y Apellido
          </label>
          <input
            type="text"
            placeholder=""
            name="fullname"
            className="bg-white-100 bg-opacity-10 text-black block w-full mb-4 border-b border-gray-600 focus:outline-none focus:border-gray-800"
          />
          <label
            htmlFor="email"
            className="font-serif text-neutral-900 select-none mb-1 block"
          >
            Email
          </label>
          <input
            type="email"
            placeholder=""
            name="email"
            className="bg-white-100 bg-opacity-10 text-black block w-full mb-4 border-b border-gray-600 focus:outline-none focus:border-gray-800"
          />

          <label
            htmlFor="password"
            className="font-serif text-neutral-900 select-none mb-1 block"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder=""
            name="password"
            className="bg-white-100 bg-opacity-10 text-black block w-full mb-6 border-b border-gray-600 focus:outline-none focus:border-gray-800"
          />
          <div className="flex items-center mb-2">
            <input type="checkbox" id="termsCheckbox" className="mr-2" />
            <label
              htmlFor="termsCheckbox"
              className="text-neutral-900 font-serif select-none"
            >
              He leído y acepto los <a className="underline hover:text-secundary-400">términos y condiciones </a> de uso
            </label>
          </div>
          <button className="w-full rounded-xl bg-primary-500 hover:bg-primary-400 px-4 py-2 mb-2 mt-5 font-serif transition ease-in delay-50 hover:scale-105 duration-150">
            Registrar
          </button>
        </form>
      </div>
      <Footer/>
    </body>
  );
}

export default RegisterPage;
