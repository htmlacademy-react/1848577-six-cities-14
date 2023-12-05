import {State, Review} from '../../types/types';
import {Status, NameSpace} from '../../consts';

export const getReviews = (state: State): Review[] => (
  state[NameSpace.Reviews].reviews
);

export const getStatusPost = (state: State): Status => (
  state[NameSpace.Reviews].statusPost
);
