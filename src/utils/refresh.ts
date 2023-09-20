import { env } from "../url"
import { toast } from 'react-hot-toast';


export const refreshData = async () => {
    const url = `${env}/refresh`;

    const fetchData = async () => {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
    
        if (!response.ok && response.status !== 403) {
            throw new Error(`Server responded with status: ${response.statusText}`);
        }
    
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
    
        return data;
    }

    toast.promise(
        fetchData(),
        {
            loading: 'Actualisation en cours...',
            success: (data) => {
                if (data.error) {
                    return `Erreur : ${data.error}`;
                }
                return `L'actualisation des données s'est passée avec succès.`;
            },
            error: (err) => `Erreur : ${err.message}`
        }
    );
}
