import {AuthorizationStatus, SortOption} from '../consts';
import {OfferPreview, State} from '../types/types';

function upperCaseFirst(str: string): string {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

function getDate(date: string): string {
  return `${new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`;
}

function getRatingWidth(rating: number): string {
  let ratingWidth = String(rating * 20);
  ratingWidth += '%';
  return ratingWidth;
}

function sortByOption (offers: OfferPreview[], activeSortingType: string) {
  switch (activeSortingType) {
    case SortOption.Popular:
      return offers;
    case SortOption.PriceLowToHigh:
      return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
    case SortOption.PriceHighToLow:
      return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
    case SortOption.TopRatedFirst:
      return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error(`Unknown activeSortType: ${activeSortingType}`);
  }
}

function checkAuthStatus (state: State): boolean {
  const authorizationStatus = state.authorizationStatus;
  return authorizationStatus === AuthorizationStatus.Auth;
}

export {upperCaseFirst, getDate, getRatingWidth, sortByOption, checkAuthStatus};
