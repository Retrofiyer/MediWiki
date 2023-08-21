import Footer from "./components/footer";
import NavbarL from "./components/navbarl";
import React from "react";
import Image from "next/image";

function home() {
  return (
    <body>
      <NavbarL/>
      <div
        className="flex justify-center h-[calc(100vh-4rem)] items-center bg-cover bg-center p-4"
        style={{
          backgroundImage: 'url("/img/fondos.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-white-100 bg-opacity-80 p-8 md:p-12 lg:p-20 rounded-3xl shadow-2xl max-w-screen-md w-full mx-auto mb-4 mt-4 md:mb-10 md:mt-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 rounded-full mb-4 md:mb-0 md:mr-4">
              <Image
                src="/img/logon.png"
                width={616 / 3}
                height={627 / 3}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-black text-center">
                MediWiki
              </h1>
              <p className="text-base md:text-xl font-serif text-black mt-1 font-semibold text-center md:text-left">
                Conocimiento médico a tu alcance
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </body>
  );
}

export default home;