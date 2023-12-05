import {OfferPreview, State} from '../../types/types';
import {CityName, NameSpace, Status} from '../../consts';
import {getActiveCity} from '../app-process/selectors';
import {createSelector} from '@reduxjs/toolkit';

export const getOffers = (state: State): OfferPreview[] => (
  state[NameSpace.Offers].offers
);

export const getOffersStatus = (state: State): Status => (
  state[NameSpace.Offers].fetchingStatus
);

export const getFilteredOffers = createSelector(
  [getOffers, getActiveCity],
  (offers: OfferPreview[], activeCity: string | CityName): OfferPreview[] => (
    offers.filter((offer) => offer.city.name === activeCity)
  )
);

export const getFavoritesOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].favorites;

export const getFavoritesStatus = (state: State): Status => state[NameSpace.Offers].fetchingFavoritesStatus;
