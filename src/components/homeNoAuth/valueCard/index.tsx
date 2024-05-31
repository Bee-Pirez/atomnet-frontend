import React from 'react';
import { Card, CardBody } from "@nextui-org/react";

interface ValuelCardProps {
  title: string;
  imageSrc: string; // Adicione a propriedade para a imagem
  imageAlt?: string; // Adicione uma propriedade opcional para o atributo alt da imagem
}

const ValueCard = ({ title, imageSrc, imageAlt }: ValuelCardProps) => {
  return (
    <Card className="flex flex-row gap-4 overflow-hidden items-center justify-center">
      <img
        src={imageSrc} 
        alt={imageAlt || title}
        className="w-12"
      />
      <CardBody>
        <h3 className="text-h3-lg text-white">{title}</h3>
      </CardBody>
    </Card>
  );
};


export default ValueCard;