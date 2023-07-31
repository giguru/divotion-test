import React from 'react';
import {Container, Navbar, Nav, Badge} from "react-bootstrap";
import {useWishListContext} from "../../contexts/WishListContext";
import useWindowSidePanel from "./window-side-panel/useWindowSidePanel";
import WindowSidePanel from "./window-side-panel/WindowSidePanel";
import WishList from "../wish-list/WishList";
import Icons from "../../libs/icons";
import {useAuthContext} from "../../contexts/AuthContext";

const navBarId = 'basic-navbar-nav';

function MainBar() {
    const { numberOfProducts } = useWishListContext();
    const { isOpen, toggle } = useWindowSidePanel()
    const { user } = useAuthContext();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    CompanyLogo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={navBarId} />
                <Navbar.Collapse id={navBarId} >
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link onClick={toggle}>
                            {numberOfProducts
                                ? (
                                    <>
                                        <Icons.FilledWishList size={30} />
                                        <Badge>{numberOfProducts}</Badge>
                                    </>
                                )
                                : <Icons.EmptyWishList size={30} /> }
                        </Nav.Link>
                        <Nav.Item>
                            {user ? user.name : <a onClick={() => alert('Not made for this test')}>Log in</a>}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {isOpen && (
                <WindowSidePanel onClose={toggle}>
                    <WishList />
                </WindowSidePanel>
            )}
        </Navbar>
    );
}

export default MainBar;
