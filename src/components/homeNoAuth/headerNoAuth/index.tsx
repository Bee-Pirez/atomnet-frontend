"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";

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
      className={`sticky top-0 left-0 right-0 z-50  px-4 sm:px-16 md:px-32 lg:px-50 flex justify-between items-center py-8 transition-colors duration-300 ${
        scrolled ? "bg-[#04040E] border-b border-[#111138]" : ""
      }`}
    >
      <Link href="/">
        <img src="/logoIcon.svg" alt="logoAtomNetIcon" className="w-12" />
      </Link>
      <div className="flex gap-4">
        <Link href="/auth/login">
          <Button
            color="primary"
            variant="bordered"
            className="border-2 border-normalBlue px-6 py-2 rounded-sm text-white"
          >
            Entrar
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button className="bg-normalBlue text-white shadow-lg px-6 py-2 rounded-sm transition-colors duration-300 ease-in-out hover:bg-hoverBlue">
            Cadastrar
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderNoAuth;

