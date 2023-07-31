import React from 'react';
import Icons from "../../libs/icons";
import {useWishListContext} from "../../contexts/WishListContext";
import {ProductModel} from "../../types/api-models";
import {useLocalDisappearingFeedback} from "../local-disappearing-feedback/LocalDisappearingFeedback";

interface AddToWishListButtonInterface {
    productId: ProductModel['id']
}

function AddToWishListButton({ productId }: AddToWishListButtonInterface) {
    const { setValue } = useLocalDisappearingFeedback();
    const { isSelected, setProduct } = useWishListContext();

    const productIsSelected = isSelected(productId);

    return (
        <button
            className="bg-transparent border-0"
            onClick={() => {
                setProduct(productId, productIsSelected ? 0 : 1);
                setValue(productIsSelected ? 'Removed' : 'Added!')
            }}
        >
            {productIsSelected ? <Icons.FilledWishList size={30} /> : <Icons.EmptyWishList size={30} />}
        </button>
    );
}

export default AddToWishListButton;
