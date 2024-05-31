import ServiceCard from "../serviceCard";

const ServiceSection = function () {
  return (
    <section className="py-20 lg:py-40 md:py-32 px-4 sm:px-16 md:px-32 lg:px-50 flex flex-col items-center text-center justify-center">
      <div className="mb-4 max-w-4xl">
        <h2 className="text-h2-sm sm:text-h2-sm xl:text-h2-lg md:text-h2-md">
          Nossos serviços
        </h2>
        <p className="mt-2 text-p-sm xl:text-p-lg sm:text-p-sm text-gray-200">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem.Lorem Ipsum is simply dummy text of the printing and
          typesetting industry lorem.Lorem Ipsum is simply
        </p>
      </div>
      <div className="cardsSection grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <ServiceCard
          title="Nossos serviços"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text."
        />
        <ServiceCard
          title="Nossos serviços"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text."
        />
        <ServiceCard
          title="Nossos serviços"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text."
        />
        <ServiceCard
          title="Nossos serviços"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text."
        />
      </div>
    </section>
  );
};

export default ServiceSection;
