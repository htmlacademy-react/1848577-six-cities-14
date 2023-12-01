import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../consts';
import {Offer, AppDispatch, State} from '../types/types';
import {fetchOffers, setOffersDataLoadingStatus} from './action';
import {AxiosInstance} from 'axios';

export const fetchOfferAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(fetchOffers(data));
});
