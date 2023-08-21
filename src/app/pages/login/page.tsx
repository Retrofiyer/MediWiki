"use client";

import Footer from "@/app/components/footer";
import NavbarL from "@/app/components/navbarl";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";


function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/pages/home");

    console.log(res);
  };
  return (
    <body>
      <NavbarL/>
      <div
        className="justify-center h-[calc(100vh-1rem)] flex items-center bg-gradient-to-br from-white-400 to-secundary-400"
        style={{
          backgroundImage: 'url("/img/fondo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white-500 bg-opacity-80 px-8 py-5 w-auto shadow-2xl rounded-3xl"
        >
          {error && (
            <div className="bg-red-600 text-white p-2 mb-2">{error}</div>
          )}
          <h1 className="font-serif text-neutral-900 text-center text-4xl select-none">
            {" "}
            MediWiki{" "}
          </h1>
          <br></br>
          <div
            style={{
              width: "100",
              height: "120px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image
              src="/img/logon.png"
              width={616 / 5}
              height={627 / 5}
              alt=""
            />
          </div>
          <a className="font-serif text-neutral-900 select-none">Email</a>
          <input
            type="email"
            placeholder=""
            name="email"
            className="bg-white-500 bg-opacity-10 text-black py-1 block w-full mb-4 border-b border-gray-600 focus:outline-none focus:border-gray-800"
          />
          <a className="font-serif text-neutral-900 select-none">Contraseña</a>
          <input
            type="password"
            placeholder=""
            name="password"
            className="bg-white-500 bg-opacity-10 text-black py-1 block w-full mb-2 border-b border-gray-600 focus:outline-none focus:border-gray-800"
          />
          <br></br>
          <button className="flex w-full justify-center rounded-xl bg-primary-500 hover:bg-primary-400 px-4 py-2 font-serif transition ease-in delay-50 hover:scale-105 duration-150">
            {" "}
            Ingresar{" "}
          </button>
          <br></br>
          <div className="flex justify-between items-center mb-3">
            <p className="text-black font-serif select-none">
              ¿Aún no tienes una cuenta?
            </p>
            <a
              href="/pages/register"
              className="text-secundary-500 underline font-serif hover:text-secundary-200"
            >
              Registrate
            </a>
          </div>
        </form>
      </div>
      <Footer/>
    </body>
  );
}
export default LoginPage;
