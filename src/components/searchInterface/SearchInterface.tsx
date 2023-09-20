import React, { useEffect, useState } from "react";

import "./searchInterface.css";
import { useSearch, useWordDef } from "../../hooks/useSearch";
import SearchBar from "./SearchBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


interface WordClicked {
  word: string | null;
  currentIndex: number;
}

const SearchInterface = () => {
  const [syllable, setSyllable] = useState<string>("Bienvenue");
  const [debouncedSyllable, setDebouncedSyllable] = useState<string>(syllable);
  const searchResults = useSearch(debouncedSyllable);
  const [wordClicked, setWordClicked] = useState<WordClicked>({
    word: null,
    currentIndex: 0,
  });
  const wordDef = useWordDef(wordClicked.word);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSyllable(syllable);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, [syllable]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSyllable(value);
  };

  const handleWordClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setWordClicked({
      ...wordClicked,
      currentIndex: 0,
      word: event.currentTarget.textContent?.toLowerCase() as string,
    });
  };

  const handleClickIndex = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    let newIndex = wordClicked.currentIndex;

    if (name === "prev" && newIndex !== null && newIndex > 0) {
      newIndex--;
    } else if (
      name === "next" &&
      newIndex !== null &&
      newIndex !== wordDef.size - 1
    ) {
      newIndex = newIndex === wordDef.size ? 0 : newIndex + 1;
    }

    setWordClicked({ ...wordClicked, currentIndex: newIndex });
  };

  return (
    <div className="interface">
      <SearchBar style={{margin:'20px'}} change={handleChange} id="search-bar" />
      <div className="w">
        <div className="words">
          <div className="details-word">
            <div className="word-count">
              {" "}
              {searchResults?.totalCount > 1
                ? "Mots disponibles"
                : "Mot disponible"}{" "}
              ({searchResults?.totalCount || 0})
            </div>
          </div>
          <div className="words-container">
            {searchResults &&
              (searchResults.solutions.length > 0 ? (
                searchResults.solutions.map((word: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`word ${
                        wordClicked.word === word[0] ? "wordSelected" : ""
                      }`}
                      onClick={handleWordClick}
                      dangerouslySetInnerHTML={{
                        __html: word[0].replace(
                          new RegExp(`${syllable}`, "gi"),
                          `<span class="searchSyllable">${syllable}</span>`
                        ),
                      }}
                    />
                  );
                })
              ) : (
                <div className="solutionNotFound">
                  Aucune solution trouvée pour la syllable {syllable}.
                </div>
              ))}
          </div>
        </div>

        <div className="defs">
          <div className="details-word">
            <div className="word-count">
              {wordDef.size > 1
                ? "Définitions disponibles"
                : "Définition disponible"}{" "}
              ({wordDef.size || 0})
            </div>
          </div>

          <div className="def-container">
            <div className="def">
              {wordDef.results && wordDef.results.length > 0
                ? wordDef.results[wordClicked.currentIndex]
                : wordDef.results && wordDef.results.length === 0
                ? `Aucune solution trouvée pour le mot ${wordClicked.word}.`
                : ""}
            </div>

            <div className="containerIndexButtons">
              <button
                onClick={handleClickIndex}
                name="prev"
                className="button-prev">
                <FaArrowLeft />
              </button>
              <div className="page">Page {wordClicked.currentIndex + 1}</div>
              <button
                onClick={handleClickIndex}
                name="next"
                className="button-next">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
