import { useState, ReactNode } from "react";
import { AppContext } from './context/AppContext';

interface AppProviderProps {
  children: ReactNode;
}


export default function AppProvider({ children } : AppProviderProps) {
    const [comments, setComments] = useState<object>([]);
    const [users, setUsers] = useState<object>([]);

    // ... các state và hàm khác

    return (
        <AppContext.Provider value={{ comments, users, setComments, setUsers}}>
            {children}
        </AppContext.Provider>
    );
}