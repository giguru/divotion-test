import React from 'react';
import './App.scss';
import MainBar from "./components/layout/MainBar";
import {WishListProvider} from "./contexts/WishListContext";
import {Col, Container, Row} from "react-bootstrap";
import ProductGrid from "./components/product-grid/ProductGrid";
import AuthContextProvider from "./contexts/AuthContext";

function App() {

    return (
        <AuthContextProvider>
            <WishListProvider>
                <MainBar />
                <Container>
                    <Row>
                        <Col>
                            <h1>Products</h1>
                        </Col>
                    </Row>
                    <ProductGrid />
                </Container>
            </WishListProvider>
        </AuthContextProvider>
    );
}

export default App;
