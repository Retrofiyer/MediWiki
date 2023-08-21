"use client";
import NarvbarS from "@/app/components/navbars";
import Footer from "@/app/components/footer";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { signOut } from "next-auth/react";

const QAPage = () => {
  // Estado para la pregunta y la respuesta
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);

  // Estado para saber si se está haciendo una petición
  const [loading, setLoading] = useState<boolean>(false);

  // Manejar cambios en la pregunta
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Obtener respuesta desde la API
  const getAnswer = async () => {
    setLoading(true);
    try {
      // Formatear la pregunta y obtener respuesta
      const formattedQuestion = formatQuestion(question);
      const apiResponse = await fetchAnswerFromApi(formattedQuestion);

      // Dividir respuesta y establecer en el estado
      setResponse(apiResponse.split("\n"));
    } catch (error) {
      console.error("Error al obtener la respuesta.");
      setResponse(["Error al obtener la respuesta."]);
    }

    setLoading(false);
  };

  // Darle un formato a la pregunta para la API
  const formatQuestion = (question: string): string => {
    return `enlista los siguientes items: nombre, via de administracion, efectos, compuestos quimicos del siguiente medicamento: "${question}" cada uno bajo el otro`;
  };

  // Obtener respuesta desde la API
  const fetchAnswerFromApi = async (formattedQuestion: string) => {
    const response = await axios.post("http://localhost:8080/", {
      question: formattedQuestion,
      temperature: 0.4,
    });
    return response.data.response;
  };

  // Dar formato a un elemento de respuesta
  const formatResponseItem = (item: string): string => {
    const separatorIndex = item.indexOf(":");
    if (separatorIndex !== -1) {
      const title = item.substring(0, separatorIndex).trim();
      const content = item.substring(separatorIndex + 1).trim();
      return `<strong>${title}:</strong> ${content}`;
    } else {
      return item;
    }
  };

  // Limpiar la respuesta
  const clearResponse = () => {
    setResponse([]);
  };

  // Interfaz de usuario
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
        <div className="flex justify-end mr-10 text-blue-300 hover:text-primary-400">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
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
              <label
                htmlFor="question"
                className="font-bold font-serif mb-2 text-gray-900 text-left"
              >
                Medicamento a buscar
              </label>

              <div className="flex items-center">
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/img/lupa.png"
                    width={64 / 2}
                    height={64 / 2}
                    alt="lupa"
                    style={{ position: "absolute", left: "10px" }}
                  />
                  <input
                    id="question"
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Escribe el medicamento..."
                    className="pl-10 w-full md:w-80 h-10 md:h-11 p-2 md:p-3 text-center text-gray-800 border border-gray-400 rounded-md focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    clearResponse();
                    getAnswer();
                  }}
                  className="px-2 py-1 md:px-4 md:py-2 bg-primary-500 hover:bg-primary-400 text-base md:text-lg rounded-md ml-2 transition ease-in delay-50 hover:scale-105 duration-150" disabled={!question || loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </div>
            {response.length > 0 && (
              <div className="bg-white-500 bg-opacity-40 border border-gray-800 p-4 md:p-10 rounded-md text-gray-800 font-serif shadow-2xl">
                <h3 className="text-center mb-3 font-semibold">Respuesta:</h3>
                <ul>
                  {response.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="mb-1"
                      dangerouslySetInnerHTML={{
                        __html: formatResponseItem(item),
                      }}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default QAPage;
