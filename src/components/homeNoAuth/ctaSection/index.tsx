"use client";
import React from 'react';
import { Button } from "@nextui-org/react";
import Link from "next/link";

const CTASection = () => {
  return (
      <section className="bg-cover bg-center bg-no-repeat text-white px-4 md:px-0 py-16 md:py-32 text-center mb-16 md:mb-40" style={{ backgroundImage: 'url("/imgCTABackground.png")' }}>
      <div className="container flex flex-col justify-center items-center mx-auto h-full">
        <div className="max-w-4xl px-8"> {/* Ajuste para max-w-4xl e adição de px-8 */}
          <h2 className="text-2xl md:text-3xl mb-6 title2">
            Pronto para desvendar as possibilidades da nossa{" "}
            <strong>plataforma?</strong>
          </h2>
          <div className="flex justify-center items-center gap-4 btnSection">
            <Link href="/login">
              <Button variant="solid" radius="md" className="btn">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="solid" radius="md" className="btn">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection;