export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
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
