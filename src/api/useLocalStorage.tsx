import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../contexts/AuthContext";

// For ease of implementation and typescriptness
export enum LocalStorageKeys {
    WISHLIST = 'wshlst'
}

const EMPTY_VALUE = undefined;

interface useLocalStorageInterface<T> {
    data: T | typeof EMPTY_VALUE,
    write: (newValue: T) => void
}

/**
 *
 * @param key
 * @param useUserKey Set to true if the locally stored data must be user dependent.
 *                   E.g. a wishlist which is different for each user.
 */
function useLocalStorage<T>(key: LocalStorageKeys, useUserKey = false) : useLocalStorageInterface<T> {
    const { user } = useAuthContext();
    const composedKey = user ? `${key}.${user.id}` : key;

    const readLocalStorageValue = (data: string | null) => {
        try {
            return data ? JSON.parse(data) : EMPTY_VALUE;
        } catch (e) {
            // Catch the SyntaxError: JSON.parse unexpected character
            return EMPTY_VALUE;
        }
    }
    const [value, setValue] = useState(readLocalStorageValue(localStorage.getItem(composedKey)));

    const writeLocalStorageValue = (data: T | typeof EMPTY_VALUE) => {
        const serialized = data ? JSON.stringify(data) : EMPTY_VALUE;

        if (serialized) {
            localStorage.setItem(composedKey, serialized);
            setValue(data);
        } else {
            localStorage.removeItem(composedKey);
        }
    }


    useEffect(() => {
        // Local storage can be edited from all over the code, so add an event listener
        //  to make sure the data is up-to-date.
        const listener = () => {
            setValue(localStorage.getItem(composedKey));
        };

        window.removeEventListener('storage', listener);
        return () => {
            window.removeEventListener('storage', listener);
        }
    }, []);

    return {
        data: value,
        write: writeLocalStorageValue,
    };
}

export default useLocalStorage;
