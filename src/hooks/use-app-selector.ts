import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {State} from '../types/types';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
