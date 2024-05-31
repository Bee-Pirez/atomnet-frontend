import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import MemberCard from "../memberCard";

const SliderSection = () => {
  const membersData = [
    {
      name: "Andre Barreto",
      description: "Descrição 1",
      linkedinLink: "https://www.linkedin.com/in/andre-barreto-/",
      imageSrc: "/imgMember1.jpg",
    },
    {
      name: "Felipe Barboza",
      description: "Descrição 2",
      linkedinLink: "https://www.linkedin.com/in/felipe-barboza-a8555b221/",
      imageSrc: "/imgMember2.jpg",
    },
    {
      name: "Fernando Ritt",
      description: "Descrição 3",
      linkedinLink:
        "https://www.linkedin.com/in/fernando-ritt/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      imageSrc: "/imgMember3.jpg",
    },
    {
      name: "Matheus Augusto",
      description: "Descrição 4",
      linkedinLink:
        "https://www.linkedin.com/in/matheus-augusto-290ab8238?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      imageSrc: "/imgMember4.jpg",
    },
    {
      name: "Vinícius de Barros",
      description: "Descrição 5",
      linkedinLink:
        "https://www.linkedin.com/in/vin%C3%ADcius-de-barros-fernandes-96a8341b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      imageSrc: "/imgMember5.jpg",
    },
  ];

  return (
    <section className="items-center content-center justify-center py-20 lg:py-24 md:py-24 px-4 sm:px-16 md:px-32 lg:px-50">
      <div className="mb-4 max-w-4xl" >
        <h2 className="text-start text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
        Venha conhecer nossa <strong>equipe</strong>
        </h2>
        <p className=" text-start mt-2 mb-20 text-p-sm xl:text-p-lg sm:text-p-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys standard dummy text ever.Lorem Ipsum is simply dummy text of the 
        </p>
      </div>
      <div className="text-start content-start">
        <Splide
          options={{
            type: "loop",
            drag: "free",
            focus: "center",
            pagination: false,
            perPage: 5,
            gap: "1rem",
            autoScroll: {
              speed: 1,
            },
            breakpoints: {
              1764:{
                perPage: 4,
                width: 1764,
              },
             
              1468: {
                perPage: 3,
                width: 1468,
              },
              1170: {
                perPage: 2,
                width: 1170,
              },
              858:{
                perPage: 2,
                width: 858,
              },
              850:{
                perPage: 1,
                width: 850,
              },
              570:{
                perPage: 1,
                width: 500,
              }
              
            },
          }}
          extensions={{
            AutoScroll: AutoScroll,
          }}
          className="carouselContainer"
        >
          {membersData.map((member, index) => (
            <SplideSlide key={index}>
              <MemberCard  key={index}
              name={member.name}
              linkedinLink={member.linkedinLink}
              imageSrc={member.imageSrc}
              description={member.description}/>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default SliderSection;