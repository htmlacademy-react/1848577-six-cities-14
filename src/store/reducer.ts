import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, CITIES, SortOption} from '../consts';
import {Offer, SortingType} from '../types/types';
import {changeCity, fetchFavorites, fetchOffers, requireAuthorization, setOffersDataLoadingStatus, setSortingType} from './action';

type State = {
  activeCity: string;
  offers: Offer[];
  activeSortingType: typeof SortOption[SortingType];
  isOffersDataLoading: boolean;
  favorites: Offer[];
  authorizationStatus: AuthorizationStatus;
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: [],
  activeSortingType: SortOption.Popular,
  isOffersDataLoading: false,
  favorites: [],
  authorizationStatus: AuthorizationStatus.Auth,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setSortingType, (state, action) => {
      state.activeSortingType = action.payload.activeSortingType;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};

