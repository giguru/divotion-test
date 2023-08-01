import React from 'react';
import Icons from "../../libs/icons";
import {useWishListContext} from "../../contexts/WishListContext";
import {ProductModel} from "../../api/api-models";
import {useLocalDisappearingFeedback} from "../layout/local-disappearing-feedback/LocalDisappearingFeedback";
import {useConfirmation} from "../../contexts/ConfirmationModalContext";

interface AddToWishListButtonInterface {
    productId: ProductModel['id']
}

function AddToWishListButton({ productId }: AddToWishListButtonInterface) {
    const { setValue } = useLocalDisappearingFeedback();
    const { isSelected, setProduct } = useWishListContext();
    const { confirm } = useConfirmation();

    const productIsSelected = isSelected(productId);

    return (
        <button
            className={`bg-transparent border-0 animated ${productIsSelected ? 'tada': 'fadeIn'}`}
            onClick={() => {
                if (productIsSelected) {
                    confirm(`Are you sure you want to remove this from your wishlist?`)
                        .then(() => {
                            setProduct(productId, 0);
                            setValue('Removed');
                        })
                        .catch(() => {
                            setProduct(productId, 0);
                            setValue('Removed');
                        })
                } else {
                    setProduct(productId, 1);
                    setValue('Added');
                }
            }}
        >
            {productIsSelected ? <Icons.FilledWishList className="text-primary" size={30} /> : <Icons.EmptyWishList size={30} />}
        </button>
    );
}

export default AddToWishListButton;
