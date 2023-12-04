import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute} from '../consts';
import {Offer, AppDispatch, State, AuthData, UserData, OfferPreview, Review, PostReview} from '../types/types';
import {setOffersDataLoadingStatus, redirectToRoute} from './action';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../services/token';

type ExtraType = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  ExtraType
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  Offer['id'],
  ExtraType
>('offers/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  Offer['id'],
  ExtraType
>('reviews/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  return data;
});

export const postReviewAction = createAsyncThunk<Review, PostReview, ExtraType>(
  'reviews/postComments',
  async ({id, rating, comment}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<
  OfferPreview[],
  OfferPreview['id'],
  ExtraType
>('nearPlaces/fetchNearplaces', async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
  );
  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
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
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
