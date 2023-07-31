import {FormikProps} from "formik/dist/types";
import QuantitySelector from "./QuantitySelector";
import {Button} from "react-bootstrap";
import Loading from "../layout/Loading";
import Icons from "../../libs/icons";
import React from "react";

type WishListRowFormProps = Pick<FormikProps<{ qty: string }>, 'handleSubmit' | 'values' | 'isSubmitting' | 'initialValues'>;

export default function WishListRowForm({ handleSubmit, values, isSubmitting, initialValues }: WishListRowFormProps) {
    const currentQty = values.qty;

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-start align-items-start gap-2">
            <div>
                <QuantitySelector name="qty" />
            </div>
            {currentQty !== initialValues.qty && (
                <Button type="submit" variant="success" disabled={isSubmitting}>
                    {isSubmitting ? <Loading /> : <Icons.Save size={20} />}
                </Button>
            )}
        </form>
    )
}
