import { LinkedinLogo } from "phosphor-react";
import Link from "next/link";

interface MembersCardProps {
  name: string;
  description: string;
  linkedinLink: string;
  imageSrc: string;
}

const MemberCard = ({
  name,
  description,
  linkedinLink,
  imageSrc,
}: MembersCardProps) => {
  return (
    <>
      <section className="container">
        <img src={imageSrc} alt={name} className="cardImage" />
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="medias">
          <Link className="linkedinBtn"  href={linkedinLink} target="blank">
            <LinkedinLogo size={24} />
          </Link>
        </div>
      </section>
      <style jsx>{`
        .container {
          position: relative;
          width: 300px;
          height: 310px;
          overflow: hidden;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          border-radius: 0.5rem;
          padding: 80px 2rem;
          text-align: right;
        }

        .cardImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          transition: filter 0.4s, transform 0.4s;
        }

        h3,
        p {
          padding-right: 2rem;
          opacity: 1;
          transition: 0.4s;
        }

        h3 {
          font-size: var(--h3-size-lg);
        }

        p {
          color: white;
        }

        .medias {
          display: flex;
          justify-content: flex-end;
          padding-right: 2rem;
        }

        .linkedinBtn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: 0.3s;
          background-color: #0077b5;
          box-shadow: 2px 12px 10px 0px rgba(0, 0, 0, 0.25);
          color-text: red;
        }

        .container:hover p,
        .container:hover h3,
        .container:hover .medias {
          opacity: 1;
          z-index: 1;
        }

        .cardImage:hover {
          filter: blur(5px);
          transform: scale(1.1);
        }

        @media (max-width: 375px) {
          .container {
            width: 210px;
            height: 210px;
            padding: 10px;
          }

          h3 {
            font-size: var(--h3-size-md);
          }

          p {
            font-size: var(--p-size-sm);
          }

          .medias {
            padding-right: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default MemberCard;

