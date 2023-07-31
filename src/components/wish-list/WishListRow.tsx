import React, {useMemo} from 'react';
import {Formik} from 'formik';
import {ProductModel} from '../../types/api-models';
import {Button, Col, Row} from 'react-bootstrap';
import * as yup from 'yup';
import QuantitySelector from './QuantitySelector';
import Loading from '../layout/Loading';
import {FaTrash} from 'react-icons/fa';
import Icons from "../../libs/icons";

interface WishListRowProps {
    product: ProductModel
    initQty: number
    setQuantity: (qty: number) => void
}


function WishListRow({ product, initQty, setQuantity }: WishListRowProps) {

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
                <Formik
                    initialValues={initValues}
                    onSubmit={(values, { setSubmitting }) => {
                        setQuantity(parseInt(values.qty, 10));
                        setSubmitting(false);
                    }}
                    validationSchema={yup.object({
                        qty: yup.number()
                            .typeError('Must be a number')
                            .min(1, 'Must be larger than 1')
                            .required('Required'),
                    })}
                    enableReinitialize
                >
                    {({ handleSubmit, values, isSubmitting }) => {
                        const currentQty = values.qty;

                        return (
                            <form onSubmit={handleSubmit} className="d-flex justify-content-start align-items-start gap-2">
                                <div>
                                    <QuantitySelector name="qty" />
                                </div>
                                {currentQty !== initValues.qty && (
                                    <Button type="submit" variant="success" disabled={isSubmitting}>
                                        {isSubmitting ? <Loading /> : <Icons.Save size={20} />}
                                    </Button>
                                )}
                            </form>
                        )
                    }}
                </Formik>
            </Col>
        </Row>
    );
}

export default WishListRow;
