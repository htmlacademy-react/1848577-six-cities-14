const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

const ReviewLength = {
  Min: 50,
  Max: 300
} as const;

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const MAX_REVIEWS_COUNT = 10;

const MAX_NEAR_PLACES_COUNT = 3;

export {AppRoute, AuthorizationStatus, ReviewLength, CITIES, MAX_REVIEWS_COUNT, MAX_NEAR_PLACES_COUNT};
