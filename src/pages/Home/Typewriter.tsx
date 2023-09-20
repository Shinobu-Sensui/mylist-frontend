import React, { useState, useEffect } from "react";
import book from "../../img/book.jpg";
interface PropsText {
  text: string;
}

const Typewriter: React.FC<PropsText> = ({ text }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [showParagraphs, setShowParagraphs] = useState(false);
  const introText = text;

  useEffect(() => {
    if (charIndex < introText.length) {
      const timer = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShowParagraphs(true); // Animation is done, show paragraphs
    }
  }, [charIndex]);

  return (
    <>
      <h1 className="welcomeUser">{introText.slice(0, charIndex)}</h1>
      {showParagraphs && (
        <figure>
          <figcaption>
            <p>
              L'idée initiale était simple : créer une plateforme pour
              collaborer autour du dictionnaire français. L'application que vous
              voyez aujourd'hui découle de cette pensée.
            </p>

            <p>
              Les listes présentes sur cette plateforme sont conçues pour
              être informatives. Si vous êtes en charge de la gestion, des
              outils sont disponibles pour faciliter vos tâches. Les
              utilisateurs peuvent quant à eux parcourir les listes et accéder à
              différentes informations.
            </p>

            <p>
              La plateforme est construite avec des outils tels que Node.js
              et React, afin de garantir sa fonctionnalité et sa pérennité.
            </p>

            <p>
              📖 Que vous soyez ici pour gérer, contribuer ou simplement
              explorer, nous espérons que cette application répondra à vos
              besoins. Nous vous souhaitons une agréable navigation.
            </p>
          </figcaption>

          <img src={book} className="img-app-description" />
        </figure>
      )}
    </>
  );
};

export default Typewriter;
