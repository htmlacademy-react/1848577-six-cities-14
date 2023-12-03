import {createAction} from '@reduxjs/toolkit';
import {Offer, SortingType} from '../types/types';
import {AuthorizationStatus, SortOption, AppRoute} from '../consts';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const fetchOffers = createAction<Offer[]>('offers/fetchOffers');

export const fetchFavorites = createAction<Offer[]>('favorites/fetchFavorites');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setSortingType = createAction<{activeSortingType: typeof SortOption[SortingType]}>('offers/setSortingType');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
