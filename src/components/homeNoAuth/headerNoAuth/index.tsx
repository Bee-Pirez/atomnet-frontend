"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

const HeaderNoAuth = function () {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 gap-4 px-4 sm:px-16 md:px-32 lg:px-50 flex justify-between items-center py-8 transition-colors duration-300 ${
        scrolled ? "bg-[#04040E] border-b border-[#111138]" : ""
      }`}
    >
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logoAtomTechnology"
          width={160} // ajuste o valor conforme necessário
          height={160}
          className="logoImage"
        />
      </Link>
      <div className="flex gap-4">
        <Link href="/auth/login">
          <Button
            color="primary"
            variant="bordered"
            className="px-4 py-2 lg:px-8 md:px-6 sm:px-4 border-2 border-normalBlue rounded-sm text-white"
          >
            <p className="text-p-sm xl:text-p-lg sm:text-p-sm">Entrar</p>
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button className="px-4 py-2 lg:px-8 md:px-6 sm:px-4 border-2 border-normalBlue bg-normalBlue text-white shadow-lg rounded-sm transition-colors duration-300 ease-in-out hover:bg-hoverBlue">
            <p className="text-p-sm xl:text-p-lg sm:text-p-sm">Cadastrar</p>
          </Button>
        </Link>
      </div>
      <style jsx>{`
        @media (max-width: 375px) {
          .logoImage{
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderNoAuth;
