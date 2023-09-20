const envMode:string = "prod";

export const env = envMode === "dev" ? import.meta.env.VITE_API_DEV : envMode === "prod" ? import.meta.env.VITE_API_PROD : null