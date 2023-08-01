import React from 'react';
import {Col, Row} from "react-bootstrap";
import AddToWishListButton from "../wish-list/AddToWishListButton";
import useProductsIndex from "../../api/products";
import LocalDisappearingFeedback from "../layout/local-disappearing-feedback/LocalDisappearingFeedback";
import MockImage from "./MockImage";
import Loading from "../layout/Loading";

function ProductGrid() {
    const { products, isLoading } = useProductsIndex();

    return (
        <Row>
            {isLoading && <Loading />}
            {products?.map(({ name, id, description }) => (
                <Col key={id} md={4} lg={3} sm={6} className="mb-4">
                    <div className="border border-1 rounded-2 p-2">
                        <MockImage />
                        <div className="d-flex align-items-center">
                            <strong className="text-truncate flex-grow-1">{name}</strong>
                            <LocalDisappearingFeedback>
                                <AddToWishListButton productId={id} />
                            </LocalDisappearingFeedback>
                        </div>
                        <p className="text-truncate flex-grow-1 text-light-emphasis">{description}</p>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default ProductGrid;
