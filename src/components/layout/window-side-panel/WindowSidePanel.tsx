import React, {PropsWithChildren} from 'react';
import styles from './WindowSidePanel.module.scss';
import {CloseButton} from "react-bootstrap";

function WindowSidePanel({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) {
    return (
        <div className={`${styles.WindowSidePanelContainer} d-flex justify-content-end`}>
            <div className={styles.Backdrop} onClick={onClose} />
            <div className={`${styles.ContentContainer} bg-white shadow-lg position-absolute py-3 px-3 px-sm-5`}>
                <div className="float-end">
                    <CloseButton onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );
}

export default WindowSidePanel;
