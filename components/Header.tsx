import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold">
          Mini Blog
        </Link>
        <div className="flex gap-5 items-center">
          <Link href="/about">About</Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
