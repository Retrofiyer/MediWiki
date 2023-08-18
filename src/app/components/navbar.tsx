import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function Navbar() {
  const session = await getServerSession();
  
  return (
    <nav className="bg-primary-600 p-4">
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
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/pages/profile"> Home </Link>
              </li>
            </>
          ) : (
            <li className="px-3 py-1">
              <Link href="/pages/login"> Iniciar Sesión </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
