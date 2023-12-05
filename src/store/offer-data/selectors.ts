import {OfferPreview, State} from '../../types/types';
import {NameSpace, Status} from '../../consts';
import {createSelector} from '@reduxjs/toolkit';

export const getOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state) => state.offer
);

export const getOfferStatus = (state: State): Status => (
  state[NameSpace.Offer].fetchingStatus
);

export const getNearPlaces = (state: State): OfferPreview[] => state[NameSpace.Offer].nearPlaces;
