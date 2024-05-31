import React from "react";
import ValueCard from "../valueCard";

const CompanySection = () => {
  const cards = [
    {
      title: "Valor 1",

      imageSrc: "/value1.svg",
      imageAlt: "Alt text for image 1",
    },
    {
      title: "Valor 2",

      imageSrc: "/value2.svg",
      imageAlt: "Alt text for image 2",
    },
    {
      title: "Valor 3",
      imageSrc: "/value3.svg",
      imageAlt: "Alt text for image 3",
    },
    {
      title: "Valor 4",

      imageSrc: "/value4.svg",
      imageAlt: "Alt text for image 4",
    },
  ];

  return (
    <section className="flex flex-col justify-between items-start py-20 lg:py-12 md:py-32 px-4 sm:px-16 md:px-32 lg:px-50">
      <div className="flex flex-row justify-between items-center w-full px-8 md:px-0 aboutSection">
        <img
          src="/imgComputer.png"
          alt="imgComputer"
          className="w-2/4 imgCompany hidden lg:block md:hidden"
        />
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
          <div className="flex flex-wrap gap-8 mt-8">
            {cards.map((card, index) => (
              <ValueCard
                key={index}
                title={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;



