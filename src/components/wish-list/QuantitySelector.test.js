import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import QuantitySelector from './QuantitySelector';
import {Formik} from "formik";

describe('QuantitySelector', () => {
    it('descreases value', () => {
        const onSubmit = jest.fn();
        const { getByRole, getByTestId } = render(
            <QuantitySelector name="qty" />,
            { wrapper: ({ children }) => <Formik initialValues={{ qty: '2' }} onSubmit={onSubmit}>{() => children}</Formik>}
        );

        expect(getByRole('textbox')).toHaveValue('2');
        act(() => {
            fireEvent.click(getByTestId('decrease-btn'));
        });
        expect(getByRole('textbox')).toHaveValue('1');
    });

    it('cannot be lower than 1', () => {
        const onSubmit = jest.fn();
        const { getByRole, getByTestId } = render(
            <QuantitySelector name="qty" />,
            { wrapper: ({ children }) => <Formik initialValues={{ qty: '1' }} onSubmit={onSubmit}>{() => children}</Formik>}
        );

        expect(getByRole('textbox')).toHaveValue('1');
        act(() => {
            fireEvent.click(getByTestId('decrease-btn'));
        });
        expect(getByRole('textbox')).toHaveValue('1');
    });

    it('increases value', () => {
        const onSubmit = jest.fn();
        const { getByRole, getByTestId } = render(
            <QuantitySelector name="qty" />,
            { wrapper: ({ children }) => <Formik initialValues={{ qty: '2' }} onSubmit={onSubmit}>{() => children}</Formik>}
        );

        expect(getByRole('textbox')).toHaveValue('2');
        act(() => {
            fireEvent.click(getByTestId('increase-btn'));
        });
        expect(getByRole('textbox')).toHaveValue('3');
    });
});

