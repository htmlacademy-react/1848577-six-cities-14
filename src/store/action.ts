import {createAction} from '@reduxjs/toolkit';
import {Offer, SortingType} from '../types/types';
import {SortOption} from '../consts';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const fetchOffers = createAction<{offers: Offer[]}>('offers/fetchOffers');

export const setSortingType = createAction<{activeSortingType: typeof SortOption[SortingType]}>('offers/setSortingType');
