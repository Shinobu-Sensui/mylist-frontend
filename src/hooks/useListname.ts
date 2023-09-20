import { useEffect } from 'react';
import { userAccountStore } from '../store/store';
import { env } from '../url';
import { List } from '../types/list'

const useListname = () => {
   const { list, setList } = userAccountStore()
   useEffect(() => {
    const getLisname = async () => {
        const response =  await fetch(`${env}/listname`, { credentials: 'include' })
        if (response.ok) {
            const result = await response.json()
            const newList: List = {
                ...list,
                listnameAll: result,
            };
            setList(newList);
            }
        }
        getLisname()
    }, [])
}

export default useListname;