import {createSlice} from '@reduxjs/toolkit';
import {Review} from '../../types/types';
import {NameSpace, Status} from '../../consts';
import {fetchReviewsAction, postReviewAction,} from '../api-action';

type ReviewsData = {
  reviews: Review[];
  statusPost: Status;
};

const initialState: ReviewsData = {
  reviews: [],
  statusPost: Status.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.statusPost = Status.Loading;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.statusPost = Status.Error;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.statusPost = Status.Success;
      });
  }
});
