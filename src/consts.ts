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

const MAX_OFFER_PAGE_IMAGES_COUNT = 6;

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
  Favorite = '/favorite',
}

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

enum NameSpace {
  App = 'APP',
  User = 'USER',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS',
  Favorites = 'FAVORITES',
  NearPlaces = 'NEAR_PLACES',
  Offer = 'OFFER',
}

enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export {AppRoute, AuthorizationStatus, ReviewLength, CITIES, MAX_REVIEWS_COUNT, MAX_NEAR_PLACES_COUNT, MAX_OFFER_PAGE_IMAGES_COUNT, SortOption, APIRoute, Status, NameSpace, CityName};
