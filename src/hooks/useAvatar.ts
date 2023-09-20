import { useEffect } from 'react';
import { userAccountStore } from '../store/store';
import { env } from '../url';



export const useAvatar = () => {
  const { profil, setProfil } = userAccountStore()
  
  useEffect(() => {
    const getAvatar = async () => {
      const apiURL = `${env}/avatar`;
      const response = await fetch(apiURL, { credentials: 'include' });
      if (response.ok && profil) {
        const data = await response.json();
        setProfil({
          ...profil,
          image: `data:image/jpeg;base64,${data.image}`
        });
      } 
    };

    getAvatar();
  }, []); 
};
