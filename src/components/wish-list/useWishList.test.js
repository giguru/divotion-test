import {act, renderHook} from "@testing-library/react";
import useWishList from "./useWishList";


afterEach(() => {
    localStorage.clear();
});

describe('useWishList', () => {
    it('sets products', () => {
        const { result } = renderHook(() => useWishList());
        act(() => {
            result.current.setProduct('uuid-1', 1);
        });
        expect(result.current.products).toEqual({ 'uuid-1': 1 });
    });

    it('removes products', () => {
        const { result } = renderHook(() => useWishList());
        expect(result.current.products).toEqual({});
        expect(result.current.numberOfProducts).toEqual(0);
        act(() => {
            result.current.setProduct('uuid-1', 1);
        });
        expect(result.current.numberOfProducts).toEqual(1);
        expect(result.current.products).toEqual({ 'uuid-1': 1 });

        act(() => {
            result.current.setProduct('uuid-1', 0);
        });
        expect(result.current.numberOfProducts).toEqual(0);
        expect(result.current.products).toEqual({});
    });

    it('isSelected returns true', () => {
        const { result } = renderHook(() => useWishList());
        const id = 'uuid-1';
        expect(result.current.isSelected(id)).toEqual(false);
        act(() => {
            result.current.setProduct(id, 1);
        });
        expect(result.current.isSelected(id)).toEqual(true);
    });
});
