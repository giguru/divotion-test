import React, {useState} from 'react';

function useWindowSidePanel() {
    const [isOpen, setOpen] = useState(false);

    return {
        isOpen,
        toggle: () => setOpen(!isOpen),
    };
}

export default useWindowSidePanel;
