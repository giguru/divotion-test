import React from 'react';
import Icons from "../../libs/icons";
import {useWishListContext} from "../../contexts/WishListContext";

function WishListMenuIndicator() {
    const { numberOfProducts } = useWishListContext();
    return (
        <>
            {numberOfProducts
                ? (
                    <div className="position-relative">
                        <Icons.FilledWishList size={30} className="text-primary" />
                        <span className="d-flex w-100 text-light justify-content-center align-items-center position-absolute z-2 start-0 top-0">
                                            <span className="pt-1">{numberOfProducts}</span>
                                        </span>
                    </div>
                )
                : <Icons.EmptyWishList size={30} /> }
        </>
    );
}

export default WishListMenuIndicator;
