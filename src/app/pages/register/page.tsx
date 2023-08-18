"use client";

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

      if (res?.ok) return router.push("/dashboard/profile");

      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center bg-secundary-400">
      <form onSubmit={handleSubmit} className="bg-white-500 px-8 py-10 w-3/12">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className="font-serif text-neutral-900 text-center text-4xl">
          {" "}
          Registrate{" "}
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
          <Image src="/img/logon.png" width={616 / 5} height={627 / 5} alt="" />
        </div>
        <a className="font-serif text-neutral-900">Nombre y Apellido</a>
        <input
          type="text"
          placeholder="Juanito Peréz"
          name="fullname"
          className="bg-slate-200 text-black  px-4 py-2 block mb-2 w-full"
        />
        <a className="font-serif text-neutral-900">Email</a>
        <input
          type="email"
          placeholder="@email"
          name="email"
          className="bg-slate-200 text-black px-4 py-2 block mb-2 w-full"
        />
        <a className="font-serif text-neutral-900">Contraseña</a>
        <input
          type="password"
          placeholder="********"
          name="password"
          className="bg-slate-200 text-black px-4 py-2 block mb-2 w-full"
        />
        <br></br>
        <button className="flex w-full justify-center rounded-xl bg-primary-500 hover:bg-primary-400 px-4 py-2 font-serif transition ease-in delay-100 hover:scale-110 duration-150">
          {" "}
          Aceptar{" "}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
