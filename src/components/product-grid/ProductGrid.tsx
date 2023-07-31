import React from 'react';
import {Col, Row} from "react-bootstrap";
import AddToWishListButton from "../wish-list/AddToWishListButton";
import useProductsIndex from "../../api/products";
import {AiOutlineFileImage} from "react-icons/ai";
import LocalDisappearingFeedback from "../local-disappearing-feedback/LocalDisappearingFeedback";

function ProductGrid() {
    const { products } = useProductsIndex();

    return (
        <Row>
            {products.map(({ name, id, description }) => (
                <Col key={id} md={4} lg={3} sm={6} className="mb-4">
                    <div className="border border-1 rounded-2 p-2">
                        <div className="py-5 bg-light d-flex align-items-center justify-content-center mb-2">
                            <AiOutlineFileImage size={50} className="text-light-emphasis" />
                        </div>
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
