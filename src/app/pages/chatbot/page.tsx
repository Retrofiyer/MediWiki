"use client";

import Footer from "@/app/components/footer";
import NarvbarS from "@/app/components/navbars";

import Image from "next/image";
import React from "react";
import { useState, FormEvent } from "react";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  // Estado local para almacenar el valor del prompt ingresado por el usuario.
  const [prompt, setPrompt] = useState<string>("");

  // Estado local para almacenar la respuesta generada por la API.
  const [result, setResult] = useState<string>("");

  // Estado local para rastrear si se está realizando una solicitud a la API.
  const [loading, setLoading] = useState<boolean>(false);

  //Función manejadora que se ejecuta cuando se envía el formulario.
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario.

    setLoading(true); // Establecer loading a true para mostrar un indicador de carga.

    try {
      // Enviar una solicitud POST a la API en "/api/general".
      const response = await fetch("/api/general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Enviar el prompt como JSON en el cuerpo de la solicitud.
      });

      const data = await response.text(); // Leer el contenido de la respuesta como texto.

      setResult(data); // Almacenar la respuesta en el estado result.
    } catch (error: unknown) {
      // Manejar errores que puedan ocurrir durante la solicitud.
      if (error instanceof Error) {
        // Si el error es una instancia de la clase Error, mostrar el mensaje de error en un cuadro de alerta.
        alert(error.message);
      } else {
        // Si el tipo de error es desconocido, mostrar un mensaje genérico.
        alert("An unknown error occurred.");
      }
    }

    setLoading(false); // Establecer loading a false después de que se haya completado la solicitud o haya ocurrido un error.
  };

  return (
    <body>
      <NarvbarS />
      <div
        className="flex flex-col min-h-screen"
        style={{
          backgroundImage: 'url("/img/fondoia.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <form onSubmit={onSubmit}>
            <div className="flex justify-center items-center min-h-screen">
              <div className="rounded-md p-8 md:p-10 font-serif max-w-xl w-full">
                <h1 className="text-center text-3xl select-none mb-3 text-gray-900 font-semibold">
                  MEDIWIKI
                </h1>
                <div className="flex justify-center items-center mb-8">
                  <div className="w-32 h-32 flex justify-center items-center">
                    <Image
                      src="/img/logon.png"
                      width={616 / 5}
                      height={627 / 4}
                      alt="logo"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-8 items-center">
                  <h1 className="text-gray-900 font-bold text-xl ">
                    Haz tu pregunta al Farmacéutico:
                  </h1>
                  <div className="flex items-center">
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="/img/robot.png"
                        width={64 / 2}
                        height={64 / 2}
                        alt="lupa"
                        style={{ position: "absolute", left: "10px" }}
                      />
                      <input
                        type="text"
                        placeholder="Ingrese su inquietud..."
                        onChange={(e) => setPrompt(e.target.value)}
                        className="pl-10 w-full md:w-80 h-10 md:h-11 p-2 md:p-3 text-center text-gray-800 border border-gray-400 rounded-md focus:outline-none"
                      />
                    </div>
                    <button
                      className="px-2 py-1 md:px-4 md:py-2 bg-primary-500 hover:bg-primary-400 text-base md:text-lg rounded-md ml-2 transition ease-in delay-50 hover:scale-105 duration-150"
                      disabled={!prompt || loading}
                    >
                      {loading ? "Pensando..." : "Preguntar"}
                    </button>
                  </div>
                </div>
                <div className="bg-white-500 bg-opacity-40 border border-gray-800 p-4 md:p-10 rounded-md text-gray-800 font-serif shadow-2xl">
                  {result && (
                    <p className="text-xl font-bold text-white max-w-xs my-10">
                      {result}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default Homepage;
