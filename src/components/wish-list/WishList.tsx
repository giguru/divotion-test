import React from 'react';
import {useWishListContext} from "../../contexts/WishListContext";
import {Alert, Container} from "react-bootstrap";
import {useProducts} from "../../api/products";
import WishListRow from "./WishListRow";


function WishList() {
    const {
        numberOfProducts,
        products: wishListProducts,
        setProduct,
    } = useWishListContext();
    const { products } = useProducts({ ids: Object.keys(wishListProducts) });

    return (
        <Container fluid>
            <div className="h2 text-primary mb-3 mt-0">WishList</div>
            {numberOfProducts === 0 && <Alert variant="light">You have no products on your wishlist.</Alert>}
            {products.map((product, idx) => (
                <WishListRow
                    key={product.id}
                    initQty={wishListProducts[product.id]}
                    product={product}
                    setQuantity={(qty) => setProduct(product.id, qty)}
                    className="animated fadeInUp"
                    style={{
                        animationDelay: `${100 * idx}ms`
                    }}
                />
            ))}
        </Container>
    );
}

export default WishList;
