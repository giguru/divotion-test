import React, {CSSProperties, useMemo} from 'react';
import {Formik} from 'formik';
import {ProductModel} from '../../api/api-models';
import {Alert, Button, Col, Row} from 'react-bootstrap';
import * as yup from 'yup';
import {FaTrash} from 'react-icons/fa';
import useDisappearingValue from "../layout/local-disappearing-feedback/useDisappearingValue";
import WishListRowForm from "./WishListRowForm";
import {useConfirmation} from "../../contexts/ConfirmationModalContext";

interface WishListRowProps {
    product: ProductModel
    initQty: number
    setQuantity: (qty: number) => void
    className?: string
    style?: CSSProperties
}

function WishListRow({ product, initQty, setQuantity, className, style }: WishListRowProps) {
    const { value: feedback, setValue: setFeedback } = useDisappearingValue();
    const { confirm } = useConfirmation();

    const initValues = useMemo(() => {
        return { qty: `${initQty}` };
    }, [initQty]);

    return (
        <Row key={product.id} className={`p-2 bg-light mb-1 ${className}`} style={style}>
            <Col>
                <div className="d-flex align-items-center gap-1">
                    <Button
                        variant=""
                        className="text-danger ps-0 pe-1"
                        onClick={() => {
                            confirm(`Are you sure you want to remove ${product.name}?`)
                                .then(() => {
                                    setQuantity(0);
                                })
                                .catch(() => {

                                });
                        }}
                    >
                        <FaTrash />
                    </Button>
                    <span>{product.name}</span>
                </div>
            </Col>
            <Col>
                <div className="d-flex align-items-start gap-2">
                    <Formik
                        initialValues={initValues}
                        onSubmit={(values, { setSubmitting }) => {
                            setQuantity(parseInt(values.qty, 10));
                            setSubmitting(false);
                            setFeedback('Saved!');
                        }}
                        validationSchema={yup.object({
                            qty: yup.number()
                                .typeError('Must be a number')
                                .min(1, 'Must be larger than 1')
                                .required('Required'),
                        })}
                        enableReinitialize
                    >
                        {WishListRowForm}
                    </Formik>
                    {feedback && <Alert variant="success" className="py-2 animated tada mb-0">{feedback}</Alert>}
                </div>
            </Col>
        </Row>
    );
}

export default WishListRow;
