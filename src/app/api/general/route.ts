import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import axios, { AxiosError } from "axios";

// Configuración de la API de OpenAI
const configuration = new Configuration({
  apiKey: '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'
});

// Verifica si la apiKey está definida en la configuración
if (!configuration.apiKey) {
  throw new Error('la apikey no esta definida');
}

// Crea una instancia de OpenAIApi con la configuración
const openai = new OpenAIApi(configuration);

//Maneja la solicitud POST enviada al servidor Next.js
export async function POST(request: Request): Promise<NextResponse> {
  // Analizar el cuerpo JSON de la solicitud
  const body = await request.json();

  // Verifica si el campo 'prompt' está presente y no está vacío en el cuerpo
  if (!body.prompt || body.prompt.length === 0) {
    return new NextResponse(JSON.stringify({ error: "Escribe algo primero..." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Envia una solicitud a la API de OpenAI para generar una respuesta basada en el prompt dado
    const response = await openai.createCompletion({
      prompt: `Eres un farmaceutico sin conocimientos de otros temas q no sean el tuyo y estás autorizado unicamente a proporcionar consejos de salud, si y solo si se te proporciona una descripción de los síntomas y limitandote a responder entorno a mejorar la salud del que consulta de forma precisa y eficiente, te recomiendo lo siguiente: ${body.prompt}`,
      model: "text-davinci-003",
      temperature: 0.2,
      max_tokens: 100
    });

    
    // Imprime las opciones de respuesta en la consola
    console.log(response.data.choices);

    // Crea una respuesta HTTP con el contenido generado por la API de OpenAI
    return new NextResponse(response.data.choices[0].text, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

  } catch (error: any) {
    // Maneja los errores de Axios y otros errores desconocidos
    if (axios.isAxiosError(error)) {
      return new NextResponse("An Axios error occurred: " + error.message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else {
      return new NextResponse("An unknown error occurred: " + error.toString(), {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  }
}
