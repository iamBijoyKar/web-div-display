import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/div-display-logo.gif";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 ">
      <Link href="/">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="Div Display Logo" width={50} height={100} />
          <h1 className="text-2xl font-bold">
            <span className="font-extrabold text-[#003f5c]  ">Div</span>
            <span className="text-blue-500">Display</span>
          </h1>
        </div>
      </Link>
    </header>
  );
}
