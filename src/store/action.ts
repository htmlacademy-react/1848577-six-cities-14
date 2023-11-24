import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/types';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const fetchOffers = createAction<{offers: Offer[]}>('offers/fetchOffers');

