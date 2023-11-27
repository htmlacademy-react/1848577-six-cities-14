import {SortOption} from '../consts';
import {store} from '../store';

export type OfferPreview = {
  city: City;
  goods: string[];
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type Offer = OfferPreview & {
  bedrooms: number;
  description: string;
  host: Host;
  images: string[];
  previewImage: string;
}

export type City = {
  location: LocationCity;
  name: string;
}

export type LocationCity = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type SortingType = keyof typeof SortOption;
