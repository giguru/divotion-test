import React, {useEffect, useRef, useState} from 'react';

export interface useDisappearingValueProps {
    setValue: (newValue: string) => void
    value: string
}

function useDisappearingValue({ timeout } = { timeout: 2000 }) : useDisappearingValueProps {
    const [value, setValueState] = useState<useDisappearingValueProps['value']>('');
    const timeoutRef = useRef<NodeJS.Timeout>();

    const setValue = (newValue: useDisappearingValueProps['value']) => {
        clearTimeout(timeoutRef.current);
        setValueState(newValue);
        timeoutRef.current = setTimeout(() => {
            setValueState('');
        }, timeout);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return {
        setValue,
        value,
    };
}

export default useDisappearingValue;
