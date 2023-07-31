import React from 'react';
import {Button, InputGroup} from "react-bootstrap";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {ErrorMessage, Field, useField} from "formik";
import styles from "./WishListRow.module.scss";

function QuantitySelector({ name }: { name: string }) {
    const [{ value: currentQty }, , { setValue }] = useField(name);

    const decrease = () => {
        const asInt = parseInt(currentQty, 10);

        if (Number.isInteger(asInt)) {
            setValue(Math.max(1, asInt - 1).toString());
        } else {
            setValue('1');
        }
    };

    const increase = () => {
        const asInt = parseInt(currentQty, 10);
        if (Number.isInteger(asInt)) {
            setValue(Math.max(1, asInt + 1).toString());
        } else {
            setValue('1');
        }
    };

    return (
        <>
            <InputGroup className="flex-grow-0">
                <Button variant="outline-dark" className="px-1" onClick={decrease}>
                    <AiOutlineMinus size={20} />
                </Button>
                <Field name={name} className={`${styles.WishListRowInput} form-control px-0`} />
                <Button variant="outline-dark" className="px-1" onClick={increase}>
                    <AiOutlinePlus size={20} />
                </Button>
            </InputGroup>
            <span className="text-danger">
                <ErrorMessage name={name} />
            </span>
        </>
    );
}

export default QuantitySelector;
