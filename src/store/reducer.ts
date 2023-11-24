import {createReducer} from '@reduxjs/toolkit';
import {CITIES} from '../consts';
import {Offer} from '../types/types';
import {offers} from '../mocks/mocks';
import {changeCity, fetchOffers} from './action';

type State = {
  activeCity: string;
  offers: Offer[];
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};

