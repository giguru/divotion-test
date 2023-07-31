import React, {PropsWithChildren, useContext} from 'react';
import {UserModel} from "../api/api-models";

const mockUser1: UserModel = {
    id: 'user-1',
    name: 'Giguru Scheuer',
};

const mockUser2: UserModel = {
    id: 'user-2',
    name: 'Emmanuel Macron',
};

const AuthContext = React.createContext<{ user?: UserModel }>({
    user: undefined
});

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthContextProvider({ children }: PropsWithChildren<{}>) {
    return (
        <AuthContext.Provider value={{ user: mockUser1 }}>
            {children}
        </AuthContext.Provider>
    );
}
