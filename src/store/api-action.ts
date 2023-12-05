import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute, NameSpace} from '../consts';
import {Offer, AppDispatch, State, AuthData, UserData, OfferPreview, Review, PostReview, FavoriteData} from '../types/types';
import {redirectToRoute} from './action';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../services/token';

type ExtraType = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, ExtraType>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<
  Offer,
  Offer['id'],
  ExtraType
>(`${NameSpace.Offer}/fetchOffer`, async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<Review[], Offer['id'], ExtraType>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostReview, ExtraType>(
  `${NameSpace.Reviews}/postReview`,
  async ({id, rating, comment}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<
  OfferPreview[],
  OfferPreview['id'],
  ExtraType
>(`${NameSpace.Offer}/fetchNearPlaces`, async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
  );
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<OfferPreview[], undefined, ExtraType>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Favorite);
    return data;
  },
);


export const postFavoriteStatusAction = createAsyncThunk<Offer, FavoriteData, ExtraType>(
  `${NameSpace.Favorites}/postFavorite`,
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ExtraType>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  });
