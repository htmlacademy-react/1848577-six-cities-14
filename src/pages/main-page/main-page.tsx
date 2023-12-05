import {useEffect} from 'react';
import CitiesPlaces from '../../components/cities-places/cities-places';
import MainHeader from '../../components/main-header/main-header';
import LocationsList from '../../components/locations-list/locations-list';
import {getOffersStatus} from '../../store/offers-data/selectors';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useCallback, useState} from 'react';
import Loading from '../loading/loading';
import {Status} from '../../consts';
import {useAppDispatch } from '../../hooks/use-app-dispatch';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';
import {fetchFavoritesAction} from '../../store/api-action';
import {dropFavorites} from '../../store/offers-data/offers-data';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (authStatus) {
      dispatch(fetchFavoritesAction());
    }
    return () => {
      dispatch(dropFavorites());
    };
  }, [dispatch, authStatus]);

  const status = useAppSelector(getOffersStatus);

  const [isNoLength, setLengthOffers] = useState<boolean>(false);

  const handleLengthOffers = useCallback((isLength: boolean) => {
    setLengthOffers(isLength);
  }, []);

  return (
    <div className="page page--gray page--main">
      {status === Status.Loading && (
        <Loading />
      )}
      {status === Status.Success && (
        <>
          <MainHeader />
          <main className={`page__main page__main--index ${isNoLength ? 'page__main--index-empty' : ''}`}>
            <h1 className='visually-hidden'>Cities</h1>
            <div className='tabs'>
              <LocationsList />
            </div>
            <CitiesPlaces onCityChange={handleLengthOffers} />
          </main>
        </>
      )}
    </div>
  );
}

export default MainPage;
