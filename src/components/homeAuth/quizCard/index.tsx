import React, { ReactNode } from "react";

interface QuizCardProps {
  title: string;
  imageUrl: string;
  children?: ReactNode; // Adicionando a propriedade children opcional
}

const QuizCard = ({ title, imageUrl, children }: QuizCardProps) => {
  return (
    <section className="cardContainer">
      <div className="container">
        <div className="content">
          <h2 className="text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
            {title}
          </h2>
          <p className="text-p-sm xl:text-p-lg sm:text-p-sm">
            Veja seus formulários
          </p>
        </div>
        {children && <div className="extraContent">{children}</div>}
        <img src={imageUrl} alt="Card" />
      </div>
      <div className="backgroundCard"></div>
    </section>
  );
};

export default QuizCard;
