import {useEffect} from 'react';
import FavoritesList from '../../components/favorites-list/favorites-list';
import MainHeader from '../../components/main-header/main-header';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {fetchFavoritesAction} from '../../store/api-action';
import {getFavoritesOffers, getFavoritesStatus} from '../../store/offers-data/selectors';
import {Status} from '../../consts';
import Loading from '../loading/loading';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesStatus = useAppSelector(getFavoritesStatus);
  const favorites = useAppSelector(getFavoritesOffers);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div
      className={`page ${
        favorites.length === 0 ? 'page--favorites-empty' : ''
      }`}
    >
      {favoritesStatus === Status.Loading && <Loading />}
      {favoritesStatus === Status.Success && (
        <>
          <MainHeader />
          {favorites.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <FavoritesList />
          )}
          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
            </a>
          </footer>
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
