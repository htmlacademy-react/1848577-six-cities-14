import {useMemo} from 'react';
import {useAppSelector} from '../../hooks';
import {checkAuthStatus} from '../../utils/utils';
import LoggedInNav from './logged-in-nav';
import LoggedOutNav from './logged-out-nav';


function Nav(): JSX.Element {
  const isAuth = useAppSelector(checkAuthStatus);
  const getCurrentNavItem = useMemo(
    () => (isAuth) ? LoggedInNav : LoggedOutNav,
    [isAuth]
  );

  return (
    <nav className="header__nav">
      {getCurrentNavItem()}
    </nav>
  );
}

export default Nav;