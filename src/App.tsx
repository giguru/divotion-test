import React from 'react';
import './App.scss';
import MainBar from "./components/layout/MainBar";
import {WishListProvider} from "./contexts/WishListContext";
import {Col, Container, Row} from "react-bootstrap";
import ProductGrid from "./components/product-grid/ProductGrid";
import AuthContextProvider from "./contexts/AuthContext";
import ConfirmationModalContext from "./contexts/ConfirmationModalContext";

function App() {

    return (
        <ConfirmationModalContext>
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
        </ConfirmationModalContext>
    );
}

export default App;
