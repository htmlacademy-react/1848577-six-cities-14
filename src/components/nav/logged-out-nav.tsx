import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';

function LoggedOutNav(): JSX.Element {

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to={AppRoute.Login}
        >
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default LoggedOutNav;
