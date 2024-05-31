// components/CardService.tsx
import React from 'react';

interface CardServiceProps {
  title: string;
  description: string;
}

const ServiceCard = ({ title, description }: CardServiceProps) => {
  return (
    <div className="card text-start">
      <img
        src="/imgService.svg"
        alt="imgService"
        className="imgService"
      />
      <div>
        <h3 className="title3">{title}</h3>
        <p className="paragraph">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;