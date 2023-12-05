import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getAuthStatus} from '../../store/user-process/selectors';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({restrictedFor, redirectTo, children}: PrivateRouteProps) {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    restrictedFor === authStatus
      ? <Navigate to={redirectTo} />
      : children
  );
}

export default PrivateRoute;
