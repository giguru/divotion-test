import React from 'react';
import {ProductModel} from "../../types/api-models";
import useLocalStorage, {LocalStorageKeys} from "../../api/useLocalStorage";

export interface ProductListInterface {
    setProduct: (id: ProductModel['id'], qty: number) => void
    isSelected: (id: ProductModel['id']) => boolean
    products: Record<ProductModel['id'], number>
    numberOfProducts: number
}


function useWishList() : ProductListInterface {
    const {
        data,
        write: setProducts,
    } = useLocalStorage<ProductListInterface['products']>(LocalStorageKeys.WISHLIST, true);

    const products = data || {};

    const removeProduct = (id: ProductModel['id']): void => {
        const oldObj = {...products};
        if (oldObj.hasOwnProperty(id)) {
            delete oldObj[id];
        }
        setProducts(oldObj);
    };
    const setProduct = (id: ProductModel['id'], qty: number): void => {
        if (qty === 0) {
            removeProduct(id);
        } else{
            setProducts({ ...products, [id]: qty });
        }
    };

    const isSelected = (queryId: ProductModel['id']) => products?.hasOwnProperty(queryId);

    return {
        products,
        setProduct,
        isSelected,
        numberOfProducts: Object.keys(products).length,
    };
}

export default useWishList;
