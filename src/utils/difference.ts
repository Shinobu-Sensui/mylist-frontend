/**
 * 
 * @param arrayA Tableau que l'on souhaite comparer, les éléments trouvés dans le deuxième tableau sont exclus
 * @param arrayB Tableau des mots non souhaités
 * @returns Nouveau tableau sans les éléments du tableau 2
 */

export const difference = (arrayA:string[], arrayB:string[]) => {
    const setA = new Set(arrayA);
    const setB = new Set(arrayB);
    const differenceSet = new Set();
  
    setA.forEach(item => {
      if (!setB.has(item)) differenceSet.add(item);
    });
  
    return [...differenceSet];
  }
  