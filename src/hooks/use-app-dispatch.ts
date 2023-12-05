import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../types/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
