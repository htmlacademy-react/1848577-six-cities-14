import cn from 'classnames';
import {memo, useState, MouseEvent} from 'react';
import {OfferPreview} from '../../../types/types';
import {useAppDispatch} from '../../../hooks/use-app-dispatch';
import {useAppSelector} from '../../../hooks/use-app-selector';
import {useNavigate } from 'react-router-dom';
import {getAuthCheckedStatus} from '../../../store/user-process/selectors';
import {AppRoute} from '../../../consts';
import {postFavoriteStatusAction} from '../../../store/api-action';

type ButtonBookmarkProp = {
  offerId: OfferPreview['id'];
  isBig?: boolean;
  isFavorite: boolean;
}

const ButtonBookmark = memo(({isFavorite, offerId, isBig}: ButtonBookmarkProp): JSX.Element => {
  const [isFavorites, setFavorites] = useState(isFavorite);

  const isAuthorized = useAppSelector(getAuthCheckedStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const btnClassName = cn('button', {
    'place-card__bookmark-button': !isBig,
    'place-card__bookmark-button--active': isFavorites && !isBig && isAuthorized,
    'offer__bookmark-button': isBig,
    'offer__bookmark-button--active': isFavorites && isBig && isAuthorized,
  });

  const svgClassName = cn({
    'place-card__bookmark-icon': !isBig,
    'offer__bookmark-icon': isBig,
  });

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isAuthorized) {
      setFavorites((prevState) => !prevState);

      dispatch(postFavoriteStatusAction({
        id: offerId,
        status: isFavorites ? 0 : 1
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className={btnClassName} type='button'
      onClick={handleBtnClick}
    >
      <svg
        className={svgClassName}
        width={isBig ? '31' : '18'}
        height={isBig ? '33' : '19'}
      >
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
});

ButtonBookmark.displayName = 'ButtonBookmark';

export default ButtonBookmark;
