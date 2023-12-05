import {AuthorizationStatus, NameSpace} from '../../consts';
import {State, UserData} from '../../types/types';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.User].authorizationStatus
);

export const getUser = (state: State): UserData | null => (
  state[NameSpace.User].user
);

export const getAuthCheckedStatus = createSelector(
  [getAuthStatus],
  (authStatus: AuthorizationStatus): boolean => (
    authStatus === AuthorizationStatus.Auth
  )
);
