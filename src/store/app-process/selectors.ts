import {SortingType, State} from '../../types/types';
import {CityName, NameSpace, SortOption} from '../../consts';

export const getActiveCity = (state: State): CityName => state[NameSpace.App].activeCity;

export const getActiveSortedType = (state: State): typeof SortOption[SortingType] => state[NameSpace.App].activeSortedType;
