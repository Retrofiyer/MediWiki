import Link from "next/link";
import Image from "next/image";

function NarvbarS() {
  return (
    <nav className="p-4 bg-gradient-to-b from-primary-600 to-primary-400">
      <div
        className="flex justify-between container mx-auto"
        style={{ alignItems: "center" }}
      >
        <div
          style={{
            width: "100",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/img/logob.png"
            width={616 / 10}
            height={627 / 10}
            alt=""
          />
          <a className="font-serif text-xl"> MediWiki </a>
        </div>
        <ul className="flex gap-x-2">
          <>
            <li className="px-3 py-1 hover:text-secundary-300">
              <Link href="/pages/home"> Sobre Nostros </Link>
            </li>
            <li className="px-3 py-1 hover:text-secundary-300">
              <Link href="/pages/proyect"> Medicamentos </Link>
            </li>
            <li className="px-3 py-1 hover:text-secundary-300">
              <Link href="/pages/chatbot"> Búsqueda Avanzada </Link>
            </li>
          </>
        </ul>
      </div>
    </nav>
  );
}

export default NarvbarS;
