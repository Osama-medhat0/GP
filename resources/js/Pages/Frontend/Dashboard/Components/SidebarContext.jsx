import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export function useSidebarContext() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error(
            "useSidebarContext must be used within a SidebarContextProvider"
        );
    }
    return context;
}
export const SidebarProvider = ({ children }) => {
    useEffect(() => {
        console.log("SidebarProvider mounted");
    }, []);

    const [sidebarActive, setSidebarActive] = useState(false);

    return (
        <SidebarContext.Provider value={{ sidebarActive, setSidebarActive }}>
            {children}
        </SidebarContext.Provider>
    );
};
