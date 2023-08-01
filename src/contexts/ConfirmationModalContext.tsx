import React, {PropsWithChildren, useContext, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const ConfirmationContext = React.createContext<{ confirm: (message: string) => Promise<void>}>({
    confirm: (message: string) => Promise.reject(),
});

function ConfirmationModalContext({ children }: PropsWithChildren<{}>) {
    const [message, setMessage] = useState('');
    const actionsRef = useRef<{ resolve: () => void, reject: () => void } | undefined>();

    const hideModal = () => setMessage('');

    const confirm = (newMessage: string) => {
        setMessage(newMessage)
        return new Promise<void>((resolve, reject) => {
            actionsRef.current = {
                resolve: () => {
                    resolve();
                    hideModal();
                },
                reject: () => {
                    reject();
                    hideModal();
                },
            };
        });
    };

    return (
        <ConfirmationContext.Provider value={{ confirm }}>
            {children}
            {message && actionsRef.current && (
                <Modal show onHide={hideModal} size="sm">
                    <Modal.Body>
                        <p className="fw-bold text-center">{message}</p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <Button variant="outline-primary" onClick={actionsRef.current?.reject}>Go back</Button>
                        <Button onClick={actionsRef.current?.resolve}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </ConfirmationContext.Provider>
    );
}

export function useConfirmation() {
    return useContext(ConfirmationContext);
}

export default ConfirmationModalContext;
