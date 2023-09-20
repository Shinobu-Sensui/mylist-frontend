import { useCallback } from "react";
import { userAccountStore } from "../store/store";
import { fetchData } from "../utils/FetchApi";
import { env } from "../url";


export enum AuthStatus {
    Unknow = 0,
    Authenticated = 1,
    Guest = 2
}

export const useAuth = () => {
    const { account, setAccount } = userAccountStore()
    let status
    switch (account) {
        case null:
            status = AuthStatus.Guest
            break;
        case undefined:
            status = AuthStatus.Unknow
            break;
        default:
            status = AuthStatus.Authenticated
            break;
    }

    const authenticate = useCallback(async () => {
        try {
            const url = `${env}/me`
            const response = await fetchData(url)
            setAccount({ id: response.id, name: response.name, role: response.role, create: response.create, inscription: response.inscription })
    
        } catch (error) {
            setAccount(null)
        }
    }, [])


    const login = useCallback(async (name: string, password: string): Promise<any> => {

        try {
            const response = await fetchData(`${env}/login`, "POST", {
                name: name,
                password: password
            })
            setAccount(response)

        } catch (error) {
                setAccount(null)  
        }
    }, [])

    const logout = useCallback(async (): Promise<any> => {
        await fetchData(`${env}/logout`, "DELETE", {})
        setAccount(null)
    }, [])


    return {
        account,
        status,
        authenticate,
        login,
        logout,
    }
}