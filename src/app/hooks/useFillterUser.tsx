import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

interface TypeContext {
    role: string;
    setRole: (role: string) => void;
    store: string;
    setStore: (store: string) => void
}

const initFilterContext = {
    role: '',
    setRole: () => { },
    store: '',
    setStore: () => { }
}


const ContextFilter = createContext<TypeContext>(initFilterContext);

const useFilter = () => {
    return useContext(ContextFilter);
};

const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState('')
    const [store, setStore] = useState('')


    return (
        <ContextFilter.Provider value={{ role, setRole, store, setStore }}>
            {children}
        </ContextFilter.Provider>
    );
};

export {
    FilterProvider,
    useFilter,

}



