type FetchData = (url: string, method?: string, body?: {[key: string]: any}) => Promise<any | void>


export const uploadImage = async (url: string, formData: FormData) => {
    const object: RequestInit = {
        method: 'POST',
        credentials: 'include',
        body: formData, 
    };

    try {
        const response = await fetch(url, object);
        if (response.ok) return await response.json();    
    } catch (error) {
        return; 
    }
};



export const fetchData: FetchData = async (url, method = "GET", body = {}) => {
    const object: RequestInit = {
        method,
        credentials: 'include' as const,
        headers: {},
    };

    if (method === "POST" || method === "DELETE") {
        object.headers = {
            'Content-Type': 'application/json'
        };

        if (method === "POST") object.body = JSON.stringify(body);
    } 

    try {
        const response = await fetch(url, object);
        if (!response) return

        if (!response.ok && response.status !== 403) {
            throw new Error(`Server responded with status: ${response.statusText}`);
        }

        if (response.status === 403) {
            return {code: 403, error: await response.json()}
        }
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        return; 
    }
}


