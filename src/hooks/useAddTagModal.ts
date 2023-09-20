
import { env } from "../url";
import { toastError, toastSuccess } from "../utils/toast";

type ElementsSelected = {
    selected: boolean;
    index: number;
    element: string;
};

export const putModal = async (elementsSelected: { [key: string]: ElementsSelected }, word: string) => {
    
    try {
        const categories = Object.keys(elementsSelected).reduce(
            (acc: { [key: string]: number }, val: string) => {
                if (elementsSelected[val].selected) {
                    acc[elementsSelected[val].element] = 1;
                } else {
                    acc[elementsSelected[val].element] = 0;
                }
                return acc;
            },
            {}
        );

        if (categories) {
            const url = `${env}/updateTags`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    categories,
                    word,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:'include'
            });

            if (!response.ok && response.status !== 403) {
                throw new Error(`Server responded with status: ${response.statusText}`);
            }

            const data = await response.json()
            if (data.error) {
                toastError(data.error);
            } else {
                toastSuccess(`Les tags ont bien modifiés.`);
             }
            
        }       
    } catch(error) {
        console.error(error)
    }
}