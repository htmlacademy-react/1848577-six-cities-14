import cn from 'classnames';
import {useState} from 'react';
import {Offer, OfferPreview} from '../../../types/types';

type ButtonBookmarkProp = {
  offer: Offer | OfferPreview;
  isBig?: boolean;
}

function ButtonBookmark({offer, isBig}: ButtonBookmarkProp): JSX.Element {
  const [isFavorites, setFavorites] = useState(offer.isFavorite);

  const btnClassName = cn('button', {
    'place-card__bookmark-button': !isBig,
    'place-card__bookmark-button--active': isFavorites && !isBig,
    'offer__bookmark-button': isBig,
    'offer__bookmark-button--active': isFavorites && isBig,
  });

  const svgClassName = cn({
    'place-card__bookmark-icon': !isBig,
    'offer__bookmark-icon': isBig,
  });

  return (
    <button className={btnClassName} type="button" onClick= {() => {
      setFavorites(!isFavorites);
    }}
    >
      <svg className={svgClassName} width={isBig ? '31' : '18'} height={isBig ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default ButtonBookmark;
