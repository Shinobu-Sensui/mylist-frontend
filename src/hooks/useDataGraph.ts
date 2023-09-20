import { useEffect } from 'react';
import { userAccountStore } from '../store/store';
import { fetchData } from '../utils/FetchApi';
import { env } from '../url';
import { ChooseCategory } from '../types/chooseCategory';


export const useGraph = async () => {
    const { chooseCategory, setChooseCategory } = userAccountStore()
    const dataGraph = async () => {
       const response = await fetchData(`${env}/graph`)
       if (response) {
            const newResponseCategory:ChooseCategory = {
                ...chooseCategory,
                ...response
            }
            setChooseCategory(newResponseCategory)
       }
    }
    useEffect(() =>{
        dataGraph()
    }, [])
}