import {createReducer} from '@reduxjs/toolkit';
import {CITIES, SortOption} from '../consts';
import {Offer, SortingType} from '../types/types';
import {offers} from '../mocks/mocks';
import {changeCity, fetchOffers, setSortingType} from './action';

type State = {
  activeCity: string;
  offers: Offer[];
  activeSortingType: typeof SortOption[SortingType];
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: offers,
  activeSortingType: SortOption.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(setSortingType, (state, action) => {
      state.activeSortingType = action.payload.activeSortingType;
    });
});

export {reducer};

