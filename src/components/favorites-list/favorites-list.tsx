import {OfferPreview} from '../../types/types';
import {CITIES} from '../../consts';
import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';
import {getFavoritesOffers} from '../../store/offers-data/selectors';

function FavoritesList(): JSX.Element | null {
  const offers = useAppSelector(getFavoritesOffers);
  const favoritesCards: OfferPreview[][] = [];
  CITIES?.forEach((item) => {
    const filterCards = offers.filter((el) => el.city.name === item && el.isFavorite);
    if(filterCards.length !== 0) {
      favoritesCards.push(filterCards);
    }
  });

  if (!offers.length) {
    return null;
  }

  return (
    <ul className="favorites__list">
      {favoritesCards.map((item) => (
        <li key={item[0].id} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{item[0].city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {item.map((el: OfferPreview) => (
              <PlaceCard key={el.id} offer={el} size='small' page='favorites' />
            ))}
          </div>
        </li>
      ))}
    </ul>);
}

export default FavoritesList;
