import React, {PropsWithChildren, useContext} from "react";
import useWishList, {ProductListInterface} from "../components/wish-list/useWishList";

const WishListContext = React.createContext<ProductListInterface>({
    products: {},
    setProduct: () => {},
    isSelected: () => false,
    numberOfProducts: 0,
});

export function WishListProvider({ children } : PropsWithChildren<{ }>) {
    const productList = useWishList();

    return <WishListContext.Provider value={productList}>{children}</WishListContext.Provider>;
}

export function useWishListContext() {
    return useContext(WishListContext);
}
