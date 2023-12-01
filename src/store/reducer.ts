import {createReducer} from '@reduxjs/toolkit';
import {CITIES, SortOption} from '../consts';
import {Offer, SortingType} from '../types/types';
import {changeCity, fetchFavorites, fetchOffers, setOffersDataLoadingStatus, setSortingType} from './action';

type State = {
  activeCity: string;
  offers: Offer[];
  activeSortingType: typeof SortOption[SortingType];
  isOffersDataLoading: boolean;
  favorites: Offer[];
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: [],
  activeSortingType: SortOption.Popular,
  isOffersDataLoading: false,
  favorites: [],
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
    });
});

export {reducer};

