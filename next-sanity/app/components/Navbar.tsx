import Link from "next/link";
import React from "react";
import ThemeButton from "./ThemeButton";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <h1 className="text-2xl font-medium">
              sanity <span className="text-pink-400">blog</span>
            </h1>
          </Link>

          <ThemeButton />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
