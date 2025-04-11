// vite-env.d.ts (en la raíz del proyecto)
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Ejemplo de variable
    readonly VITE_BASE_URL:string;
    // Agrega aquí otras variables de entorno que 
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }