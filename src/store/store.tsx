import { create } from 'zustand';
import { combine } from 'zustand/middleware'
import defaultImage from '../img/guest.png';
import { Account } from '../types/account';
import { Profil } from '../types/profil';
import { List } from '../types/list';
import { ChooseCategory } from '../types/chooseCategory';

export const userAccountStore = create(
    combine(
        {
            account: undefined as undefined | null | Account,
            profil: { image: defaultImage, name: '', create: '', role: '' } as null | undefined | Profil,
            list: { listnameAll: { data:[] } } as List | undefined | null,
            chooseCategory: { category: "dico" } as  { category: string } | ChooseCategory | any,
            selectEditCategory: "dico" as string,
            burgerIsActive: false as boolean,
            barThickness:19 as number
        }, 
        (set) => ({
            setAccount:(account: Account | null) => set({ account }),
            setProfil:(profil:Profil | null) => set({ profil }),
            setList:(list:List) => set({ list }),
            setChooseCategory:(chooseCategory:ChooseCategory) => set({ chooseCategory }),
            setSelectEditCategory:(selectEditCategory:string) => set({selectEditCategory}),
            setBurgerIsActive:(burgerIsActive:boolean) => set({burgerIsActive}),
            setBarThickness:(barThickness:number) => set({barThickness})
        })
    )
)

