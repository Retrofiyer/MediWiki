# Importar las librerías necesarias
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback

# Crear una instancia de la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde diferentes dominios

# Nombre del archivo PDF que contiene la información médica
PDF_FILENAME = "Farma2.pdf"

# Función para extraer el texto de un archivo PDF
def extract_text_from_pdf(pdf_filename):
    with open(pdf_filename, "rb") as pdf_file:
        pdf_reader = PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

# Función para procesar una pregunta y obtener la respuesta
def process_question(question, knowledge_base):
    if question:
        # Realizar búsqueda de similitud en la base de conocimiento
        docs = knowledge_base.similarity_search(question)
        
        # Cargar y ejecutar una cadena de procesamiento de lenguaje natural
        llm = OpenAI()
        chain = load_qa_chain(llm, chain_type="stuff")
        response = chain.run(input_documents=docs, question=question)
        return response
    return "Error: No se pudo obtener la respuesta."

# Ruta principal para recibir preguntas y obtener respuestas
@app.route('/', methods=['POST'])
def main():
    # Extraer el texto del archivo PDF y dividirlo en fragmentos
    text = extract_text_from_pdf(PDF_FILENAME)
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    
    # Crear embeddings y base de conocimiento para los fragmentos de texto
    embeddings = OpenAIEmbeddings()
    knowledge_base = FAISS.from_texts(chunks, embeddings)

    # Obtener la pregunta del cliente
    data = request.get_json()
    user_question = data['question']
    
    # Procesar la pregunta y obtener la respuesta
    response = process_question(user_question, knowledge_base)

    # Enviar la respuesta al cliente en formato JSON
    return jsonify({'response': response})

# Iniciar la aplicación si se ejecuta este script directamente
if __name__ == "__main__":
    app.run(debug=True, port=8080)