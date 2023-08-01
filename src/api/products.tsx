import productJson from './../data/products.json';
import {ProductModel} from "./api-models";
import {useEffect, useState} from "react";

// TODO implement react-query when backend is ready
function useProductsIndex(): { products?: Array<ProductModel>, isLoading: boolean } {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState<Array<ProductModel> | undefined>(undefined);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProducts(productJson);
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return {
        products,
        isLoading,
    };
}

// TODO implement react-query when backend is ready
export function useProducts({ ids }: { ids: Array<ProductModel['id']> }) {
    return {
        products: productJson.filter(({ id }) => ids.indexOf(id) > -1)
    }
}

export default useProductsIndex;
