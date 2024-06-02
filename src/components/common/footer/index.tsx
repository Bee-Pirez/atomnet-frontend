"use client";
import { Copyright } from "phosphor-react";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-4 sm:px-16 md:px-32 lg:px-50 flex justify-between items-center py-8 bg-gradient-to-b from-primary to-normalViolet border-t border-[#111138]">
      <img
        src="/logoIcon.svg"
        alt="logoAtomTechnology"
        className="w-10"
      />
      <p className="flex items-center gap-2">
        <Copyright size={16} />
        2024 AtomTechnology | Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;