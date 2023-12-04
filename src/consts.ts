enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

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

enum SortOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export {AppRoute, AuthorizationStatus, ReviewLength, CITIES, MAX_REVIEWS_COUNT, MAX_NEAR_PLACES_COUNT, SortOption, APIRoute, Status};
