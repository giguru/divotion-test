import React, {PropsWithChildren, useContext, useId} from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import useDisappearingValue from "./useDisappearingValue";

const LocalDisappearFeedbackContext = React.createContext({
    setValue: (newValue: string) => {},
});

export function useLocalDisappearingFeedback() {
    return useContext(LocalDisappearFeedbackContext);
}

function LocalDisappearingFeedback({ children }: PropsWithChildren<{}>) {
    const id = useId();
    const { value, setValue } = useDisappearingValue();

    return (
        <LocalDisappearFeedbackContext.Provider value={{ setValue }}>
            <OverlayTrigger
                show={Boolean(value)}
                overlay={<Tooltip id={id}>{value}</Tooltip>}
            >
                <div>{children}</div>
            </OverlayTrigger>
        </LocalDisappearFeedbackContext.Provider>
    );
}

export default LocalDisappearingFeedback;
