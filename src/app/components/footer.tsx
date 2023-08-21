import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-primary-600 to-primary-400 text-white">
      <div className="px-6 py-8 md:px-16 lg:px-24 xl:px-32 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4 mb-4 md:mb-0">
            <Image
              src="/img/email.png"
              className="w-4 h-4 md:w-6 md:h-6 text-white"
              height={32}
              width={32}
              alt=""
            />
            <span className="hover:underline md:text-right">
              mediwiki@hotmail.com
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Image
              src="/img/whatsapp.png"
              className="w-4 h-4 md:w-6 md:h-6 text-white"
              height={32}
              width={32}
              alt=""
            />
            <span className="hover:underline"> +593 99 2803 663</span>
          </div>
        </div>
        <p className="text-center mt-4 md:mt-6">
          &copy; 2023 Derechos Reservados Grupo N°4
          <br />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
