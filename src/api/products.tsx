import React from 'react';
import productJson from './../data/products.json';
import {ProductModel} from "../types/api-models";

// TODO implement react-query when backend is ready
function useProductsIndex(): { products: Array<ProductModel> } {
    return {
        products: productJson
    };
}

// TODO implement react-query when backend is ready
export function useProducts({ ids }: { ids: Array<ProductModel['id']> }) {
    return {
        products: productJson.filter(({ id }) => ids.indexOf(id) > -1)
    }
}

export default useProductsIndex;
