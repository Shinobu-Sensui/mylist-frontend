import { useEffect, useState } from "react";
import { fetchData } from "../utils/FetchApi";
import { env } from "../url";
import { userAccountStore } from "../store/store";

export const useSearch = (syllable: string) => {
  const [results, setResults] = useState<any | null>(null);
  const { chooseCategory } = userAccountStore()

  useEffect(() => {
    const getWords = async () => {
      if (syllable.length === 0) {
        setResults('');
        return
      } 
      const response = await fetchData(`${env}/search`, 'POST', {
        syllable: syllable,
        category: chooseCategory?.category || 'dico' 
      });
      console.log
      if (response && response.data) setResults(response.data); // ou response, selon la structure de la réponse
      
    };

    getWords();
  }, [syllable, chooseCategory.category]);

  return results;
};

export const useSearchEdit = (syllable: string, isOpen:any) => {
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const { selectEditCategory } = userAccountStore()
  
 
  useEffect(() => {
    const getWords = async () => {
      if (syllable.length === 0) {
        setSearchResults('');
        return
      } // Évite de faire des requêtes avec des syllabes trop courtes
      const response = await fetchData(`${env}/search`, 'POST', {
        syllable: syllable,
        category: selectEditCategory || 'dico' 
      });
      if (response && response.data) setSearchResults(response.data); // ou response, selon la structure de la réponse
      
    };

    getWords();
  }, [syllable, selectEditCategory, isOpen]);

  return searchResults
};

type UseWordDef = (word:string|null) => any


export const useWordDef:UseWordDef = (word) => {
  const [results, setResults] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchWiktionaryPage = async () => {
      const url = `${env}/def/${word}`;
      const response = await fetch(url);
      if (!word) return setResults(null)
      if (response && word) {
        const responseJSON = await response.json()
        if (responseJSON.result) {
          setResults(responseJSON.result)
          return 
        } else {
          setResults([])
          return
        }
      } 

    }
    
    fetchWiktionaryPage();
  }, [word]);

  return {
    results,
    size: results ? results.length : null
  }
};