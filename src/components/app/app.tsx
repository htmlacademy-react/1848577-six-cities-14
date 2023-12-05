import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks/use-app-selector';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {getAuthStatus} from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
            >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
