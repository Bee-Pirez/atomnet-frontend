import React from "react";
import { CheckCircle } from "phosphor-react";

const InformationSection = () => {
  return (
    <section className="flex flex-col justify-between items-start py-20 lg:py-12 md:py-24 px-4 sm:px-16 md:px-32 lg:px-50 bg-gradient-to-b from-gray-900 to-darkerBlue">
      <div className="flex flex-row gap-12 justify-between items-center w-full px-8 md:px-0 aboutSection">
        <div className="w-full xl:w-2/4">
          <h2 className="text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
            Quem Somos
          </h2>
          <p className="mt-2 text-p-sm xl:text-p-lg sm:text-p-sm text-gray-200">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry lorem.Lorem Ipsum is simply dummy text of the printing and
            typesetting industry lorem.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry lorem.Lorem Ipsum is simply dummy
            text of the printing and.
          </p>

          <ul className="flex flex-wrap gap-4 mt-8">
            <li
              className="flex items-center"
              style={{ gap: "8px", flexBasis: "30%", padding: "24px 0 0 0" }}
            >
              <CheckCircle size={24} className="text-normalLigthBlue"/>
              <span>Texto 1</span>
            </li>
            <li
              className="flex items-center"
              style={{ gap: "8px", flexBasis: "40%", padding: "24px 0 0 0" }}
            >
              <CheckCircle size={24} className="text-normalLigthBlue"/>
              <span>Texto 2</span>
            </li>
            <li
              className="flex items-center"
              style={{ gap: "8px", flexBasis: "30%", padding: "24px 0 0 0" }}
            >
              <CheckCircle size={24} className="text-normalLigthBlue"/>
              <span>Texto 3</span>
            </li>
            <li
              className="flex items-center"
              style={{ gap: "8px", flexBasis: "30%", padding: "24px 0 0 0" }}
            >
              <CheckCircle size={24} className="text-normalLigthBlue"/>
              <span>Texto 4</span>
            </li>
          </ul>
        </div>
        <img
          src="/imgPadlock.png"
          alt="imgPadlock"
          className="w-2/4 imgCompany hidden lg:block md:hidden"
        />
      </div>
    </section>
  );
};

export default InformationSection;
