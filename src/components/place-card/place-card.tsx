import {Link} from 'react-router-dom';
import {Offer, OfferPreview} from '../../types/types';
import {getRatingWidth, upperCaseFirst} from '../../utils/utils';
import PremiumMark from '../ui/premium-mark/premium-mark';
import ButtonBookmark from '../ui/button-bookmark/button-bookmark';

type CardImageSize = 'small' | 'big';

type PlaceCardProps = {
  offer: Offer;
  size: CardImageSize;
  page: 'cities' | 'favorites' | 'near-places';
  onCardHover?: (offerId: OfferPreview['id'] | null) => void;
}

const sizeMap: Record<CardImageSize, {width: string; height: string}> = {
  small: {width: '150', height: '110'},
  big: {width: '260', height: '200'}
};

function PlaceCard({offer, size, page, onCardHover}: PlaceCardProps): JSX.Element {
  const {images, isPremium, price, title, type, id, rating} = offer;

  function handleMouseEnter() {
    onCardHover?.(id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  function getCardInfoClass() {
    let cardInfoClass;
    if (page === 'favorites') {
      cardInfoClass = 'favorites';
    } else {
      cardInfoClass = 'place';
    }

    return cardInfoClass;
  }
  return (
    <article className={`${page}__card place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPremium && <PremiumMark />}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={images[0]} {...sizeMap[size]} alt="Place image" />
        </Link>
      </div>
      <div className={`${getCardInfoClass()}-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonBookmark offer={offer} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{upperCaseFirst(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
