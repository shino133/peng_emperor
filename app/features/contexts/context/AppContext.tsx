import { createContext, Dispatch, SetStateAction } from "react";

interface AppContextType {
  comments: object;
  users: object;
  setComments: Dispatch<SetStateAction<object>>;
  setUsers: Dispatch<SetStateAction<object>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
