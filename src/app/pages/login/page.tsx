"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Loading=true;

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

    if (res?.ok) return router.push("/pages/profile");

    console.log(res);
  };
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center bg-secundary-400">
      <form onSubmit={handleSubmit} className="bg-white-500 px-8 py-10 w-3/12">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className="font-serif text-neutral-900 text-center text-4xl">
          {" "}
          Iniciar Sesión{" "}
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
        <a className="font-serif text-neutral-900">Email</a>
        <input
          type="email"
          placeholder="@email"
          name="email"
          className="bg-slate-200 text-neutral-900 px-4 py-2 block mb-2 w-full"
        />
        <a className="font-serif text-neutral-900">Contraseña</a>
        <input
          type="password"
          placeholder="********"
          name="password"
          className="bg-slate-200 text-neutral-900 px-4 py-2 block mb-2 w-full"
        />
        <br></br>
        <button className="flex w-full justify-center rounded-xl bg-primary-500 hover:bg-primary-400 px-4 py-2 font-serif transition ease-in delay-100 hover:scale-110 duration-150">
          {" "}
          Login{" "}
        </button>
        <br></br>
        <p className="text-black font-serif">
          ¿Aún no tienes una cuenta?
          <a
            href="/pages/register"
            className="text-secundary-500 underline mx-5 font-serif"
          >
            Registrarse
          </a>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;
