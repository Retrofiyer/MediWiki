import NarvbarS from "@/app/components/navbars";
import Footer from "@/app/components/footer";


function Home() {
  return (
    <body>
      <NarvbarS />
      <div className="bg-gray-100 min-h-screen">
        <div
          className="bg-cover bg-center h-96 shadow-xl"
          style={{ backgroundImage: "url('/img/fondo1.jpg')" }}
        ></div>
        {/* Contenedor de las cards */}
        <div className="flex justify-center mt-10">
          <div className="w-1/2 p-4">
            <div className="bg-white-500 rounded-lg shadow-lg flex h-full">
              <div className="w-1/2 p-4 flex items-center justify-center">
                <img
                  src="/img/Farmaco.jpg"
                  alt="Imagen 1"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-xl text-gray-800 font-serif font-semibold mt-14 mb-2 text-center">
                  Misión
                </h2>
                <p className="text-gray-700 font-serif text-justify">
                  Nuestra misión es proporcionar una plataforma diseñada para
                  estudiantes, profesionales de la salud o cualquier persona que
                  quiera saber sobre farmacología, con el propósito de facilitar
                  el aprendizaje efectivo y la adquisición de conocimientos
                  médicos esenciales.
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white-500 rounded-lg shadow-lg flex h-full">
              <div className="w-1/2 p-4">
                <h2 className="text-xl text-gray-800 font-serif font-semibold mb-2 text-center">
                  Visión
                </h2>
                <p className="text-gray-700 font-serif text-justify">
                  Nuestra visión es convertirnos en la principal plataforma de
                  referencia médica para estudiantes en el Ecuador, brindando
                  acceso instantáneo a conocimientos médicos actualizados y
                  confiables. A través de una interfaz intuitiva y herramientas
                  interactivas, nos esforzamos por empoderar a los futuros
                  profesionales de la salud, facilitando su aprendizaje,
                  comprensión y aplicación de conceptos médicos complejos.
                  Aspiramos a ser un compañero confiable en el viaje educativo
                  de cada estudiante, contribuyendo a una formación médica
                  sólida y a la excelencia en la atención médica.
                </p>
              </div>
              <div className="w-1/2 p-4 flex items-center justify-center">
                <img
                  src="/img/medicamentos.jpg"
                  alt="Imagen 2"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="w-1/2 p-4">
            <div className="bg-white-500 rounded-lg shadow-2xl flex flex-col items-center">
              <div className="p-4 flex items-center justify-center">
                <h2 className="text-xl text-gray-800 font-serif font-semibold mb-2 text-center">
                  Nuestro Objetivo
                </h2>
              </div>
              <p className="text-gray-700 font-serif text-justify mt-4 mr-10 ml-10 mb-6">
                El objetivo principal de nuestra aplicación, es brindar a los
                estudiantes de medicina una herramienta educativa avanzada que
                potencie su proceso de aprendizaje y comprensión de conceptos
                médicos complejos.
              </p>
              <div className="p-4">
                <img
                  src="/img/libros.jpg"
                  alt="Imagen 3"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
      <Footer />
    </body>
  );
}

export default Home;
