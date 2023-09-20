export type ChooseCategory = {
    forDico?: {
        list: [string], 
        size: [number]
    }
    category:string
    size:number,
    sizeSyllables: number,
    syllableFirstLetterCount: {
        [key:string]: number
    }, 
    syllableDico: [
        [string], 
        [number],
        number
    ]
}

export interface ChooseCategoryWithResponse extends ChooseCategory {
    response: any; // Remplacez "any" par le type approprié de la réponse
}