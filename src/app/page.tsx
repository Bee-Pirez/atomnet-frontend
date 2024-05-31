"use client";
import CompanySection from "@/components/homeNoAuth/companySection";
import HeaderNoAuth from "../components/homeNoAuth/headerNoAuth";
// import styles from "./styles/page.module.css";
// import "./styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { use, useEffect } from "react";
import ServiceSection from "@/components/homeNoAuth/serviceSection";
import InformationSection from "@/components/homeNoAuth/informationSection";
import MemberCard from "@/components/homeNoAuth/memberCard";
import SliderSection from "@/components/homeNoAuth/sliderSection/index";
import CTASection from "@/components/homeNoAuth/ctaSection";
import Footer from "@/components/common/footer";

export default function HomeNoAuth() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <HeaderNoAuth></HeaderNoAuth>
        <div
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
          className="relative isolate  py-20 px-4 sm:px-16 md:px-32 lg:px-50 lg:py-20"
        >
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#302fbb] to-[#00fefb] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-4xl py-12 sm:py-48 lg:py-12">
            <div className=" sm:mb-12 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-h1-sm sm:text-h1-sm xl:text-h1-lg md:text-h1-md">
                Alçando organizações à{" "}
                <strong className="text-normalLigthBlue">excelência</strong> em
                <strong className="text-normalLigthBlue">
                  segurança da informação
                </strong>
              </h1>
              <p className="mt-6 text-p-sm xl:text-p-lg sm:text-p-sm  text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum has been the industrys standard dummy
                text.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-400"
                >
                  Saber Mais Sobre a Empresa <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#302fbb] to-[#00fefb] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1200">
          <CompanySection></CompanySection>
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <ServiceSection></ServiceSection>
        </div>
        <div
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1300"
        >
          <InformationSection></InformationSection>
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SliderSection></SliderSection>
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          <CTASection></CTASection>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
