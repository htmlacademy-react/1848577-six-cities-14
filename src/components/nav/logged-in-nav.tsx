import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute} from '../../consts';
import {logoutAction} from '../../store/api-action';
import {getUser} from '../../store/user-process/selectors';
import {getFavoritesOffers} from '../../store/offers-data/selectors';

function LoggedInNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(getFavoritesOffers);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{user?.email}</span>
          <span className="header__favorite-count">{favorites.length}</span>
        </a>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={AppRoute.Login}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default LoggedInNav;
