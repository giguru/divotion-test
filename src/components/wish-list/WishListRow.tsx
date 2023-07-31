import React, {useMemo} from 'react';
import {Formik} from 'formik';
import {ProductModel} from '../../types/api-models';
import {Alert, Button, Col, Row} from 'react-bootstrap';
import * as yup from 'yup';
import {FaTrash} from 'react-icons/fa';
import useDisappearingValue from "../local-disappearing-feedback/useDisappearingValue";
import WishListRowForm from "./WishListRowForm";

interface WishListRowProps {
    product: ProductModel
    initQty: number
    setQuantity: (qty: number) => void
}

function WishListRow({ product, initQty, setQuantity }: WishListRowProps) {
    const { value: feedback, setValue: setFeedback } = useDisappearingValue();

    const initValues = useMemo(() => {
        return { qty: `${initQty}` };
    }, [initQty]);

    return (
        <Row key={product.id} className="p-2 bg-light mb-1">
            <Col>
                <div className="d-flex align-items-center gap-1">
                    <Button variant="" className="text-danger" onClick={() => { setQuantity(0) }}>
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
                    {feedback && <Alert variant="success" className="py-2">{feedback}</Alert>}
                </div>
            </Col>
        </Row>
    );
}

export default WishListRow;
